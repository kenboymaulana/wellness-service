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
const common_1 = require("@nestjs/common");
const User_Service_1 = require("../UserModules/User/User.Service");
const jwt_1 = require("@nestjs/jwt");
const Auth_Enum_1 = require("../../core/enums/Auth.Enum");
const googleapis_1 = require("googleapis");
const class_transformer_1 = require("class-transformer");
const User_Dto_1 = require("../UserModules/User/User.Dto");
const bcrypt = require("bcrypt");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt.genSalt();
            return bcrypt.hash(password, salt);
        });
    }
    comparePassword(password, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.compare(password, hash);
        });
    }
    loginWithEmail(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getOne({
                where: {
                    email: email,
                },
                relations: {
                    roles: true,
                    employees: true,
                    medicalStaffs: true,
                },
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found!');
            }
            if (!(yield this.comparePassword(password, user.password))) {
                throw new common_1.BadRequestException('Wrong email or password!');
            }
            const userData = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, user);
            const payload = {
                user: userData,
                sub: user.id,
            };
            return {
                user: userData,
                access_token: this.jwtService.sign(payload),
                refresh_token: '',
            };
        });
    }
    loginWithPhone(phoneNumber, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getOneBy({});
            if (!user) {
                throw new common_1.BadRequestException('User not found!');
            }
            if (!(yield this.comparePassword(password, user.password))) {
                throw new common_1.BadRequestException('Wrong phone number or password!');
            }
            const userData = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, user);
            const payload = {
                user: userData,
                sub: user.id,
            };
            const TokenRefresh = this.jwtService.sign({ id: user.id, email: user.email, full_name: user.full_name }, {
                secret: this.configService.get('JWT_SECRET_KEY_REFRESH'),
                expiresIn: '7d',
            });
            yield this.userService.update(user.id, { refresh_token: TokenRefresh });
            return {
                user: userData,
                access_token: this.jwtService.sign(payload),
                refresh_token: TokenRefresh,
            };
        });
    }
    loginWithSocial(socialProvider, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let socialProviderData;
            if (socialProvider === Auth_Enum_1.SocialProvider.GOOGLE) {
                socialProviderData = yield this.authenticateWithGoogle(accessToken);
            }
            const user = yield this.userService.getOneBy({
                email: socialProviderData.email,
            });
            if (!user) {
                throw new common_1.BadRequestException('User not found.');
            }
            const userData = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, user);
            const payload = {
                user: userData,
                sub: user.id,
            };
            return {
                user: userData,
                access_token: this.jwtService.sign(payload),
            };
        });
    }
    authenticateWithGoogle(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const oauth2 = googleapis_1.google.oauth2('v2');
            const OAuth2 = new googleapis_1.google.auth.OAuth2();
            OAuth2.setCredentials({ access_token: accessToken });
            try {
                const profile = yield oauth2.userinfo.get({ auth: OAuth2 });
                return {
                    email: profile.data.email,
                    fullName: profile.data.name,
                };
            }
            catch (e) {
                throw new common_1.BadRequestException(e.errors[0].message);
            }
        });
    }
    logout(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userService.update(userId, { refresh_token: null });
        });
    }
    refreshToken(userId, refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getOne({
                where: {
                    id: userId,
                },
                relations: {
                    roles: true,
                },
            });
            if (!user || !user.refresh_token) {
                throw new common_1.ForbiddenException('Access Denied!');
            }
            if (user.refresh_token != refreshToken) {
                throw new common_1.ForbiddenException('Access Denied!');
            }
            const userData = (0, class_transformer_1.plainToInstance)(User_Dto_1.UserResponseDto, user);
            const payload = {
                user: userData,
                sub: user.id,
            };
            const TokenRefresh = this.jwtService.sign({ id: user.id, email: user.email, full_name: user.full_name }, {
                secret: this.configService.get('JWT_SECRET_KEY_REFRESH'),
                expiresIn: '7d',
            });
            yield this.userService.update(user.id, { refresh_token: TokenRefresh });
            return {
                user: userData,
                access_token: this.jwtService.sign(payload),
                refresh_token: TokenRefresh,
            };
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [User_Service_1.default,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=Auth.Service.js.map