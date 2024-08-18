import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AppLoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(
        private readonly logger: AppLoggerService,
        private readonly httpAdapterHost: HttpAdapterHost,
    ) {}

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();

        const response = ctx.getResponse();

        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException ? exception.getResponse() : exception;

        this.logger.error(
            {
                timestamp: new Date().toISOString(),
                path: request.url,
                error: message,
            },
            AllExceptionsFilter.name,
        );

        response.status(status).json({
            status,
            error: message,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
