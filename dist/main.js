"use strict";
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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const TransformResponse_Interceptor_1 = require("./core/interceptors/TransformResponse.Interceptor");
const ForbiddenException_Filter_1 = require("./core/exceptions/filters/ForbiddenException.Filter");
const QueryErrorException_Filter_1 = require("./core/exceptions/filters/QueryErrorException.Filter");
const UnauthorizedException_Filter_1 = require("./core/exceptions/filters/UnauthorizedException.Filter");
const NotFoundException_Filter_1 = require("./core/exceptions/filters/NotFoundException.Filter");
const BadRequestException_Filter_1 = require("./core/exceptions/filters/BadRequestException.Filter");
const ConflictException_Filter_1 = require("./core/exceptions/filters/ConflictException.Filter");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const cookieParser = require("cookie-parser");
const body_parser_1 = require("body-parser");
const class_validator_1 = require("class-validator");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, stopAtFirstError: true }));
        app.useGlobalFilters(new NotFoundException_Filter_1.default());
        app.useGlobalFilters(new QueryErrorException_Filter_1.default());
        app.useGlobalFilters(new BadRequestException_Filter_1.default());
        app.useGlobalFilters(new UnauthorizedException_Filter_1.default());
        app.use(cookieParser());
        app.useGlobalFilters(new ForbiddenException_Filter_1.default());
        app.useGlobalFilters(new ConflictException_Filter_1.default());
        app.useGlobalInterceptors(new TransformResponse_Interceptor_1.TransformResponseInterceptor());
        app.enableCors();
        app.use((0, body_parser_1.json)({ limit: '5mb' }));
        const configSwagger = new swagger_1.DocumentBuilder()
            .setTitle('Veichle BE')
            .setDescription('Documentation Api')
            .setVersion('9.9')
            .addBearerAuth()
            .build();
        const configCustomSwagger = {
            swaggerOptions: { docExpansion: 'none' },
        };
        const doc = swagger_1.SwaggerModule.createDocument(app, configSwagger);
        swagger_1.SwaggerModule.setup('docs', app, doc, configCustomSwagger);
        const configService = app.get(config_1.ConfigService);
        aws_sdk_1.config.update({
            accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
            secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
            region: configService.get('AWS_REGION'),
        });
        (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
        yield app.listen(process.env.SERVER_PORT);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map