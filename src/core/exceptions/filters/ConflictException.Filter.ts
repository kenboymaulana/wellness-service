import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(ConflictException)
export default class ConflictExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (!Array.isArray(exception.response.message)) {
      exception.response.message = [exception.response.message]
    }

    response.status(HttpStatus.CONFLICT).json({
      success: false,
      status_code: HttpStatus.CONFLICT,
      messages: exception.response.message,
    })
  }
}
