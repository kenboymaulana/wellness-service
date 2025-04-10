import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
