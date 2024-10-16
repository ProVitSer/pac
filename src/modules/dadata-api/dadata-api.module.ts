import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DadataApiService } from './services/dadata-api.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: 'Token ' + configService.get('dadata.apiKey'),
                    'X-Secret': configService.get('dadata.secret'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [DadataApiService],
    exports: [DadataApiService],
})
export class DadataApiModule {}
