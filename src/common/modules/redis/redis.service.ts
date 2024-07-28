import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { createClient, RedisClientType } from 'redis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly logger: Logger = new Logger(RedisService.name)
    private readonly redisClient: RedisClientType

    constructor() {
        this.redisClient = createClient({
            url: process.env.REDIS_URL,
            socket: {
                reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
            },
        });
    }

    async onModuleDestroy() {
        await this.redisClient.disconnect();
    }

    async onModuleInit() {
        this.redisClient.on('error', this.onError.bind(this));
        this.redisClient.once('ready', this.onReady.bind(this));

        await this.redisClient.connect();
    }

    private onReady() {
        this.logger.log('Redis connected');
    }

    private onError(error: Error) {
        this.logger.error(error);
        process.exit(0);
    }

    public get client() {
        return this.redisClient;
    }
}