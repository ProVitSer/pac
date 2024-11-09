import { ConfigService } from '@nestjs/config';
import { BullModuleAsyncOptions, BullRootModuleOptions } from '@nestjs/bull';
import { BullEnvironmentVariables, RedisEnvironmentVariables } from './interfaces/config.interface';

export function bullConfig(config: ConfigService): BullRootModuleOptions {
    const redis = config.get('redis') as RedisEnvironmentVariables;
    const bull = config.get('bull') as BullEnvironmentVariables;

    return {
        redis: {
            host: redis.host,
            port: Number(redis.port),
            username: bull.username,
            password: bull.password,
            db: bull.db,
        },
    };
}

export function bullQueueConfig(config: ConfigService): BullModuleAsyncOptions {
    const bull = config.get('bull') as BullEnvironmentVariables;

    return {
        name: bull.queueName,
    };
}
