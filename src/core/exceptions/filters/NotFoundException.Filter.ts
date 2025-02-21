import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(NotFoundException)
export default class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.NOT_FOUND).json({
      success: false,
      status_code: HttpStatus.NOT_FOUND,
      messages: ['Service not found.'],
    })
  }
}
