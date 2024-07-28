import { Module } from '@nestjs/common';
import { LinksModule } from './modules/links/links.module';
import { RedisModule } from './common/modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LinksModule, RedisModule, ConfigModule.forRoot()],
})
export class AppModule { }
