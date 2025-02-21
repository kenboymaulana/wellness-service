import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { TransformResponseInterceptor } from './core/interceptors/TransformResponse.Interceptor'
import ForbiddenExceptionFilter from './core/exceptions/filters/ForbiddenException.Filter'
import QueryErrorExceptionFilter from './core/exceptions/filters/QueryErrorException.Filter'
import UnauthorizedExceptionFilter from './core/exceptions/filters/UnauthorizedException.Filter'
import NotFoundExceptionFilter from './core/exceptions/filters/NotFoundException.Filter'
import BadRequestExceptionFilter from './core/exceptions/filters/BadRequestException.Filter'
import ConflictExceptionFilter from './core/exceptions/filters/ConflictException.Filter'
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { config } from 'aws-sdk'
import * as cookieParser from 'cookie-parser'
import { json } from 'body-parser'
import { useContainer } from 'class-validator'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  )
  app.useGlobalFilters(new NotFoundExceptionFilter())
  app.useGlobalFilters(new QueryErrorExceptionFilter())
  app.useGlobalFilters(new BadRequestExceptionFilter())
  app.useGlobalFilters(new UnauthorizedExceptionFilter())
  app.use(cookieParser())
  app.useGlobalFilters(new ForbiddenExceptionFilter())
  app.useGlobalFilters(new ConflictExceptionFilter())
  app.useGlobalInterceptors(new TransformResponseInterceptor())
  app.enableCors()
  app.use(json({ limit: '5mb' }))

  const configSwagger = new DocumentBuilder()
    .setTitle('Veichle BE')
    .setDescription('Documentation Api')
    .setVersion('9.9')
    .addBearerAuth()
    .build()

  const configCustomSwagger: SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: 'none' },
  }

  const doc = SwaggerModule.createDocument(app, configSwagger)
  SwaggerModule.setup('docs', app, doc, configCustomSwagger)

  const configService = app.get(ConfigService)
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  })

  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  await app.listen(process.env.SERVER_PORT)
}
bootstrap()
