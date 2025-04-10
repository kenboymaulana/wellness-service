import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface TransformResponse<T> {
    success?: boolean;
    status_code?: number;
    messages?: string;
    data: T | T[];
    count?: number;
}
export declare class TransformResponseInterceptor<T> implements NestInterceptor<T | any, TransformResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<TransformResponse<T>>;
}
