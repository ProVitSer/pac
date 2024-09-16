import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@app/common/config/config.provider';
import { WinstonModule } from 'nest-winston';
import { LogLevel } from '@app/common/config/interfaces/config.enum';
import { createLogger } from '@app/common/config/logger.config';
import { AppLoggerService } from '@app/common/logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from '@app/common/config/database.config';
import { ClientModule } from '../client/client.module';
import { LicensesModule } from '../licenses/licenses.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ProductsModule } from '../products/products.module';
import { PostInterceptor } from '@app/common/interceptors/post.interceptor';
import { ErrorsInterceptor } from '@app/common/interceptors/errors.interceptor';
import { MailModule } from '../mail/mail.module';
import { AmqpModule } from '../amqp/amqp.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { SoftwareDistributionModule } from '../software-distribution/software-distribution.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { LoggerMiddleware } from '@app/common/middlewares/logger.middleware';
import { VoipModule } from '../voip/voip.module';
import { FilesModule } from '../files/files.module';
import { CdrModule } from '../cdr/cdr.module';
import { CallQualityAssessmentModule } from '../call-quality-assessment/call-quality-assessment.module';
import { PacConnectorModule } from '../pac-connector/pac-connector.module';
import { RedisModule } from '../redis/redis.module';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { PacCallModule } from '../pac-connector/modules/pac-call/pac-call.module';
import { ApiModule } from '../api/api.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            isGlobal: true,
            cache: false,
        }),
        WinstonModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return createLogger(configService.get<LogLevel[]>('log.level'));
            },
            inject: [ConfigService],
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return databaseConfig(configService);
            },
        }),
        ClientModule,
        LicensesModule,
        ProductsModule,
        MailModule,
        AmqpModule,
        NotificationsModule,
        SoftwareDistributionModule,
        UsersModule,
        AuthModule,
        VoipModule,
        FilesModule,
        CdrModule,
        CallQualityAssessmentModule,
        PacConnectorModule,
        RedisModule,
        PacSqlModule,
        PacCallModule,
        ApiModule,
        RouterModule.register([
            {
                path: 'api',
                children: [
                    {
                        path: 'client',
                        module: ClientModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'licenses',
                        module: LicensesModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'products',
                        module: ProductsModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'software-distribution',
                        module: SoftwareDistributionModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'auth',
                        module: AuthModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'cdr',
                        module: CdrModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'voip',
                        module: VoipModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'files',
                        module: FilesModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'cqa',
                        module: CallQualityAssessmentModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'pac',
                        module: PacConnectorModule,
                    },
                ],
            },
            {
                path: 'api',
                children: [
                    {
                        path: 'pac',
                        module: ApiModule,
                    },
                ],
            },
        ]),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        AppLoggerService,
        LoggerMiddleware,
        {
            provide: APP_INTERCEPTOR,
            useClass: PostInterceptor,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ErrorsInterceptor,
        },
    ],
    exports: [AppLoggerService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerMiddleware).forRoutes();
    }
}
