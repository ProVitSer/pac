import { Module } from '@nestjs/common';
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
import { RouterModule } from '@nestjs/core';

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
        RouterModule.register([
            {
                path: 'api/v1',
                children: [
                    {
                        path: 'client',
                        module: ClientModule,
                    },
                ],
            },
        ]),
    ],
    controllers: [AppController],
    providers: [AppService, AppLoggerService],
    exports: [AppLoggerService],
})
export class AppModule {}
