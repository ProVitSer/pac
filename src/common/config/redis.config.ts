import { RedisModuleOptions } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';
import { RedisEnvironmentVariables } from './interfaces/config.interface';

export function redisonfig(config: ConfigService): RedisModuleOptions {
    const redis = config.get('redis') as RedisEnvironmentVariables;
    return {
        type: 'single',
        url: `redis://${redis.host}:${redis.port}`,
        options: {
            username: redis.username,
            password: redis.password,
        },
    };
}
