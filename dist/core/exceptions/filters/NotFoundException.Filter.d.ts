import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
