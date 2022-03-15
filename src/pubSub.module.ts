import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () => new RedisPubSub({
        connection: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        }
      }),
    }
  ],
  exports: [PUB_SUB],
})
export class PubSubModule { }
