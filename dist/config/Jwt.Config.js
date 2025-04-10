"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicRoute = exports.IS_PUBLIC_ROUTE = exports.ScopesGuard = exports.HasScopes = exports.JwtAuthGuard = exports.RefreshTokenStrategy = exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const core_1 = require("@nestjs/core");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }
    validate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return payload;
        });
    }
};
JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
exports.JwtStrategy = JwtStrategy;
let RefreshTokenStrategy = class RefreshTokenStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET_KEY_REFRESH,
            passReqToCallback: true,
        });
    }
    validate(req, payload) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        return Object.assign(Object.assign({}, payload), { refreshToken });
    }
};
RefreshTokenStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], RefreshTokenStrategy);
exports.RefreshTokenStrategy = RefreshTokenStrategy;
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector) {
        super();
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(exports.IS_PUBLIC_ROUTE, [context.getHandler(), context.getClass()]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        if (err || !user) {
            throw err || new common_1.UnauthorizedException();
        }
        return user;
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
const HasScopes = (scopes) => (0, common_1.SetMetadata)('scopes', scopes);
exports.HasScopes = HasScopes;
let ScopesGuard = class ScopesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const scopes = this.reflector.get('scopes', context.getHandler());
        if (!scopes) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasScope = () => user.scopes.some((scope) => scopes.includes(scope));
        return user && user.scopes && hasScope();
    }
};
ScopesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], ScopesGuard);
exports.ScopesGuard = ScopesGuard;
exports.IS_PUBLIC_ROUTE = 'PUBLIC_ROUTE';
const PublicRoute = () => (0, common_1.SetMetadata)(exports.IS_PUBLIC_ROUTE, true);
exports.PublicRoute = PublicRoute;
//# sourceMappingURL=Jwt.Config.js.map