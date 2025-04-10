import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Strategy } from 'passport-jwt';
import { Reflector } from '@nestjs/core';
import { UserResponseDto } from '../modules/UserModules/User/User.Dto';
import { Request } from 'express';
export interface JwtPayload {
    sub: number;
    user: UserResponseDto;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: JwtPayload): Promise<JwtPayload>;
}
declare const RefreshTokenStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor();
    validate(req: Request, payload: any): any;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest(err: any, user: any): any;
}
export declare const HasScopes: (scopes: string[]) => import("@nestjs/common").CustomDecorator<string>;
export declare class ScopesGuard implements CanActivate {
    private readonly reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean;
}
export declare const IS_PUBLIC_ROUTE = "PUBLIC_ROUTE";
export declare const PublicRoute: () => import("@nestjs/common").CustomDecorator<string>;
export {};
