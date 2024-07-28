import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { FastifyReply } from 'fastify';
import { UseLinkParamsDto } from './dto/use-link-params.dto';
import { LinksConstants } from 'src/common/modules/constants/links.constants';

@Controller(LinksConstants.ROOT_PATH)
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('create')
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get(':key')
  async use(@Param() params: UseLinkParamsDto, @Res() res: FastifyReply) {
    const url = await this.linksService.use(params.key);
    res.header('Cache-Control', 'no-store');
    return res.code(301).redirect(url);
  }
}
