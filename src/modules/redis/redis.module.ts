import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import * as Redis from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from '@app/common/config/redis.config';

@Module({
    imports: [
        Redis.RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return redisConfig(configService);
            },
            inject: [ConfigService],
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
