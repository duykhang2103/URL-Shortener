import { IBaseRepository } from '../../../core/repositories/ibase.repository';
import { UrlEntity } from '../entities/url.entity';
import { FilterUrlDto } from '../dto/crud-url.dto';

export interface IUrlRepository extends IBaseRepository<UrlEntity> {
  getUrlsByCondition(options: FilterUrlDto): Promise<UrlEntity[]>;
}
