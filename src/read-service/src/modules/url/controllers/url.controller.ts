import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUrlService } from '../services/iurl.service';
import { FilterUrlDto } from '../dto/crud-url.dto';
import { BaseController } from 'src/core/controllers/base.controller';

@Controller('url')
@ApiTags('Url')
export class UrlController extends BaseController {
  constructor(
    @Inject('IUrlService')
    private readonly urlService: IUrlService,
  ) {
    super();
  }

  @Get()
  @ApiOperation({ summary: 'Danh sách url' })
  public async listAll(@Query() body: FilterUrlDto) {
    try {
      const data = await this.urlService.listAll(body);
      return this.sendOkResponse(data, 'success');
    } catch (error) {
      return this.sendFailedResponse(error.message, error.status);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Thông tin chi tiết url' })
  public async getOne(@Param('id') id: number) {
    try {
      const data = await this.urlService.getOne(id);
      return this.sendOkResponse(data, 'success');
    } catch (error) {
      return this.sendFailedResponse(error.message, error.status);
    }
  }
}
