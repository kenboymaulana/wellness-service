"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let ConflictExceptionFilter = class ConflictExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (!Array.isArray(exception.response.message)) {
            exception.response.message = [exception.response.message];
        }
        response.status(common_1.HttpStatus.CONFLICT).json({
            success: false,
            status_code: common_1.HttpStatus.CONFLICT,
            messages: exception.response.message,
        });
    }
};
ConflictExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.ConflictException)
], ConflictExceptionFilter);
exports.default = ConflictExceptionFilter;
//# sourceMappingURL=ConflictException.Filter.js.map