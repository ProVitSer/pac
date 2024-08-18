import { LoggerService } from '@nestjs/common';
import { Inject, Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { _ } from 'lodash';

@Injectable()
export class AppLoggerService implements LoggerService {
    constructor(@Inject('winston') private readonly _logger: winston.Logger) {}

    log(message: any, context?: string | undefined) {
        const formatMessage = _.isObject(message) ? JSON.stringify(message, null, 2) : message;

        this._logger.info(formatMessage, { context });
    }

    error(message: any, trace?: string | undefined, context?: string | undefined) {
        const formatMessage = _.isObject(message) ? JSON.stringify(message, null, 2) : message;

        this._logger.error(formatMessage, { context, trace });
    }

    warn(message: any, context?: string | undefined) {
        const formatMessage = _.isObject(message) ? JSON.stringify(message, null, 2) : message;

        this._logger.warn(formatMessage, { context });
    }

    debug(message: any, context?: string | undefined) {
        const formatMessage = _.isObject(message) ? JSON.stringify(message, null, 2) : message;

        this._logger.debug(formatMessage, { context });
    }
}
