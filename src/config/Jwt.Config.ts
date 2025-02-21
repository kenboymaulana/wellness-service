import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard, PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Reflector } from '@nestjs/core'
import { UserResponseDto } from '../modules/UserModules/User/User.Dto'
import { Request } from 'express'

export interface JwtPayload {
  sub: number
  user: UserResponseDto
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  async validate(payload: JwtPayload) {
    return payload
  }
}

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY_REFRESH,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim()
    return { ...payload, refreshToken }
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE,
      [context.getHandler(), context.getClass()],
    )
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }
  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}

//DECORATOR HASSCOPE()
export const HasScopes = (scopes: string[]) => SetMetadata('scopes', scopes)

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler())
    if (!scopes) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const user = request.user
    const hasScope = () => user.scopes.some((scope) => scopes.includes(scope))
    return user && user.scopes && hasScope()
  }
}

//DECORATOR PUBLICROUTE()
export const IS_PUBLIC_ROUTE = 'PUBLIC_ROUTE'
export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true)
