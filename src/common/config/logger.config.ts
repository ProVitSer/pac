import 'winston-daily-rotate-file';
import { format } from 'winston';
import { WinstonModuleOptions } from 'nest-winston';
import * as Transport from 'winston-transport';
import * as winston from 'winston';
import { LogLevel } from './interfaces/config.enum';
import { LogEnvironmentVariables } from './interfaces/config.interface';
const { combine, timestamp, printf, splat } = format;
import configuration from '@app/common/config/config.provider';

const consoleFormat = printf((data) => {
    return `[${data.level}]: ${data.timestamp} : ${data.message} ${data.stack || ''} `;
});

const getTransport = (logType: LogLevel, logConf: LogEnvironmentVariables): Transport => {
    switch (logType) {
        case LogLevel.console:
            return new winston.transports.Console({
                level: 'debug',
                format: consoleFormat,
            });

        default:
            return new winston.transports.DailyRotateFile({
                dirname: logConf.path,
                level: logType,
                filename: `%DATE%-${logType}.log`,
                datePattern: logConf.formatDate,
                handleExceptions: true,
                json: true,
                zippedArchive: false,
                maxSize: logConf.mixSize,
                maxFiles: logConf.maxFiles,
            });
    }
};

const getTransports = (logTransports: LogLevel[]): Transport[] => {
    const { log } = configuration();

    return logTransports.map((type: LogLevel) => {
        return getTransport(type, log);
    });
};

export const createLogger = (level: LogLevel[]): WinstonModuleOptions => {
    return {
        format: combine(
            timestamp(),
            splat(),
            printf(({ level, context, message, timestamp }) => {
                return `[${level}] [${context}] ${timestamp} : ${message}`;
            }),
        ),
        transports: getTransports(level),
    };
};
