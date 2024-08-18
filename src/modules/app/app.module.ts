import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '@app/common/config/config.provider';
import { WinstonModule } from 'nest-winston';
import { LogLevel } from '@app/common/config/interfaces/config.enum';
import { createLogger } from '@app/common/config/logger.config';
import { AppLoggerService } from '@app/common/logger/logger.service';

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
    ],
    controllers: [AppController],
    providers: [AppService, AppLoggerService],
    exports: [AppLoggerService],
})
export class AppModule {}
