import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(UnauthorizedException)
export default class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      status_code: HttpStatus.UNAUTHORIZED,
      messages: ['Unauthorized!'],
    })
  }
}
