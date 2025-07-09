import { Inject, Injectable } from '@nestjs/common';
import { IUrlService } from './iurl.service';
import { IUrlRepository } from '../repositories/iurl.repository';
import { UrlEntity } from '../entities/url.entity';
import { FilterUrlDto } from '../dto/crud-url.dto';

@Injectable()
export class UrlService implements IUrlService {
  constructor(
    @Inject('IUrlRepository')
    private readonly urlRepository: IUrlRepository,
  ) {}

  getOne(id: number): Promise<UrlEntity> {
    return this.urlRepository.findById(id);
  }

  listAll(options: FilterUrlDto): Promise<UrlEntity[]> {
    return this.urlRepository.getUrlsByCondition(options);
  }
}
