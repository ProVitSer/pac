import { Module } from '@nestjs/common';
import { RedisService } from './services/redis.service';
import * as Redis from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisonfig } from '@app/common/config/redis.config';

@Module({
    imports: [
        Redis.RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return redisonfig(configService);
            },
            inject: [ConfigService],
        }),
    ],
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
