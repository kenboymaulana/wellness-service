"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformResponseInterceptor = class TransformResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => ({
            success: data.success ? data.success : true,
            messages: data.message,
            status_code: data.status_code
                ? data.status_code
                : context.switchToHttp().getResponse().statusCode,
            data: data.data ? data.data : null,
            count: data.count
                ? data.count
                : data.data
                    ? Array.isArray(data.data)
                        ? data.data.length
                        : 1
                    : 0,
        })));
    }
};
TransformResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformResponseInterceptor);
exports.TransformResponseInterceptor = TransformResponseInterceptor;
//# sourceMappingURL=TransformResponse.Interceptor.js.map