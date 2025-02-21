import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { Response } from 'express'

@Catch(QueryFailedError)
export default class QueryErrorExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      status_code: HttpStatus.BAD_REQUEST,
      messages: [exception.detail],
    })
  }
}
