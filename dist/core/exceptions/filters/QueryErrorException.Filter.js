"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let QueryErrorExceptionFilter = class QueryErrorExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response.status(common_1.HttpStatus.BAD_REQUEST).json({
            success: false,
            status_code: common_1.HttpStatus.BAD_REQUEST,
            messages: [exception.detail],
        });
    }
};
QueryErrorExceptionFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.QueryFailedError)
], QueryErrorExceptionFilter);
exports.default = QueryErrorExceptionFilter;
//# sourceMappingURL=QueryErrorException.Filter.js.map