import { Request, Response, NextFunction } from 'express';
import { Inject, Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private requestErrorMessage = null;
    private readonly requestStart = Date.now();

    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    use(request: Request, response: Response, next: NextFunction): void {
        request.on('error', (error) => {
            this.getError(error);
        });

        response.on('error', (error) => {
            this.getError(error);
        });

        response.on('finish', () => {
            this.logMiddleware(request, response, this.requestErrorMessage);
        });

        next();
    }

    private getError(error: any) {
        this.requestErrorMessage = error.message;
    }

    private logMiddleware(request: Request, response: Response, errorMessage: string) {
        const { httpVersion, method, socket, url, body } = request;

        const { remoteFamily } = socket;

        const { statusCode, statusMessage } = response;

        this.logger.log({
            timestamp: Date.now(),
            processingTime: Date.now() - this.requestStart,
            body: request.body,
            errorMessage,
            httpVersion,
            method,
            remoteAddress: UtilsService.getClientIp(request),
            remoteFamily,
            url,
            request: {
                body,
            },
            response: {
                statusCode,
                statusMessage,
            },
        });
    }
}
