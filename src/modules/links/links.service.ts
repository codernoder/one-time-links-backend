import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RedisService } from 'src/common/modules/redis/redis.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateLinkDto } from './dto/create-link.dto';
import { plainToInstance } from 'class-transformer';
import { LinkDto } from './dto/link.dto';
import { LinksConstants } from 'src/common/modules/constants/links.constants';
import * as path from 'path';

@Injectable()
export class LinksService {
  private readonly logger: Logger = new Logger(LinksService.name)

  constructor(private readonly redisService: RedisService) { }

  async create(createLinkDto: CreateLinkDto) {
    const key = uuidv4();

    await this.redisService.client.setNX(key, createLinkDto.originalUrl);

    return plainToInstance(LinkDto, {
      key,
      originalUrl: createLinkDto.originalUrl,
      generatedUrl: path.join(process.env.APP_PUBLIC_HOST, LinksConstants.ROOT_PATH, key)
    })
  }

  async use(key: string) {
    const url = await this.redisService.client.get(key)

    this.logger.log({ url });

    if (!url) {
      throw new NotFoundException(LinksConstants.NOT_FOUND_OR_USED_ERROR_MESSAGE)
    }

    await this.redisService.client.del(key)

    return url
  }
}
