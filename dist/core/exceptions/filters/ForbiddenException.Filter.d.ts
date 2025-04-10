import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class ForbiddenExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
