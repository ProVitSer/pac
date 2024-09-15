import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@InjectRedis() private readonly redis: Redis) {}

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.redis.set(key, JSON.stringify(value));
        if (ttl) {
            await this.redis.expire(key, ttl);
        }
    }

    async get(key: string): Promise<any> {
        const data = await this.redis.get(key);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }

    async expire(key: string, ttl: number): Promise<void> {
        await this.redis.expire(key, ttl);
    }

    async hset(key: string, field: string, value: any): Promise<void> {
        await this.redis.hset(key, field, JSON.stringify(value));
    }

    async hget(key: string, field: string): Promise<any> {
        const data = await this.redis.hget(key, field);
        if (data) {
            return JSON.parse(data);
        }
        return null;
    }

    async hgetall(key: string): Promise<any> {
        const data = await this.redis.hgetall(key);
        if (data) {
            const parsedData = {};
            for (const [field, value] of Object.entries(data)) {
                parsedData[field] = JSON.parse(value);
            }
            return parsedData;
        }
        return null;
    }

    async hdel(key: string, field: string): Promise<void> {
        await this.redis.hdel(key, field);
    }

    async ttl(key: string): Promise<number> {
        return await this.redis.ttl(key);
    }
}
