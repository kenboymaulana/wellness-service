import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class ConflictExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
