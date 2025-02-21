import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface TransformResponse<T> {
  success?: boolean
  status_code?: number
  messages?: string
  data: T | T[]
  count?: number
}

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T | any, TransformResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse<T>> {
    return next.handle().pipe(
      map((data) => ({
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
      })),
    )
  }
}
