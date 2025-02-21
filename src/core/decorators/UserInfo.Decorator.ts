import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    // console.log(request.user)
    // const verified = request.user.user.is_verified
    // console.log(request.headers.authorization.split(' ')[1]);
    // console.log(request.user);
    // if(!verified){
    //   throw new UnauthorizedException('disini')
    // }
    return request.user
  },
)
