import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export default class QueryErrorExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): any;
}
