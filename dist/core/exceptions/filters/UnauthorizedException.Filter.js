"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let UnauthorizedExceptionFilter = class UnauthorizedExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(common_1.HttpStatus.UNAUTHORIZED).json({
            success: false,
            status_code: common_1.HttpStatus.UNAUTHORIZED,
            messages: ['Unauthorized!'],
        });
    }
};
UnauthorizedExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.UnauthorizedException)
], UnauthorizedExceptionFilter);
exports.default = UnauthorizedExceptionFilter;
//# sourceMappingURL=UnauthorizedException.Filter.js.map