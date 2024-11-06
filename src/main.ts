import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import configuration from '@app/common/config/config.provider';
import httpsConfig from '@app/common/config/http.config';
import { loadCorsConfiguration } from './common/config/cors.config';
import { AppLoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
import { PostInterceptor } from './common/interceptors/post.interceptor';

async function bootstrap() {
    try {
        const configService = new ConfigService(configuration());

        const httpsOptions = httpsConfig(configService);

        const app = await NestFactory.create(AppModule, {
            ...(httpsOptions ? { httpsOptions } : {}),
        });

        app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true, forbidUnknownValues: true }));

        app.enableCors(loadCorsConfiguration(configService.get('cors')));

        app.useGlobalInterceptors(new ErrorsInterceptor(app.get(WINSTON_MODULE_NEST_PROVIDER)), new PostInterceptor());

        const httpAdapter = app.get(HttpAdapterHost);

        const loggerService = app.get<AppLoggerService>(AppLoggerService);

        app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

        app.useGlobalFilters(new AllExceptionsFilter(loggerService, httpAdapter));

        const appPort = configService.get<number>('appPort');

        await app.listen(appPort);

        process
            .on('unhandledRejection', (reason, p) => {
                console.log(reason);

                loggerService.error({ reason, p }, 'Unhandled Rejection');
            })
            .on('uncaughtException', (error: Error) => {
                console.log(error);

                loggerService.error(error, 'Uncaught Exception');
            });

        loggerService.log(`App listen on port: ${appPort}`);
    } catch (e) {
        console.log(e, 'Error on bootstrap!');

        process.exit(1);
    }
}

bootstrap();
