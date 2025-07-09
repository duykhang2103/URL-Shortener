import { FilterUrlDto } from '../dto/crud-url.dto';
import { UrlEntity } from '../entities/url.entity';

export interface IUrlService {
  listAll(options: FilterUrlDto): Promise<UrlEntity[]>;
  getOne(id: number): Promise<UrlEntity>;
}
