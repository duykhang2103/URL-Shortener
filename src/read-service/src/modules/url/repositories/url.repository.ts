import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../core/repositories/base.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from '../entities/url.entity';
import { IUrlRepository } from './iurl.repository';
import { FilterUrlDto } from '../dto/crud-url.dto';

@Injectable()
export class UrlRepository
  extends BaseRepository<UrlEntity>
  implements IUrlRepository
{
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {
    super(urlRepository);
  }

  getUrlsByCondition(query: FilterUrlDto): Promise<UrlEntity[]> {
    const { page, limit, ...objWhere } = query;
    return this.urlRepository.find({
      select: {},
      ...(query.page && query.limit
        ? {
            skip: (Number(query.page) - 1) * query.limit,
            take: query.limit,
          }
        : null),
      where: {
        ...objWhere, // default where condition
      },
      order: {
        createdAt: 'DESC', // default order by createdAt
      },
    });
  }
}
