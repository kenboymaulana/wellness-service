import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(ForbiddenException)
export default class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.FORBIDDEN).json({
      success: false,
      status_code: HttpStatus.FORBIDDEN,
      messages: ['Forbidden! You have no access to this resources!'],
    })
  }
}
