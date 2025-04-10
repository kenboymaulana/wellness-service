import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class UnauthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
