import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export default class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (!Array.isArray(exception.response.message)) {
      exception.response.message = [exception.response.message]
    }

    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      status_code: HttpStatus.BAD_REQUEST,
      messages: exception.response.message,
    })
  }
}
