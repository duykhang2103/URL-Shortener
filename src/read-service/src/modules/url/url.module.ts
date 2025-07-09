import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './entities/url.entity';
import { UrlRepository } from './repositories/url.repository';
import { UrlService } from './services/url.service';
import { UrlController } from './controllers/url.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [
    {
      provide: 'IUrlRepository',
      useClass: UrlRepository,
    },
    {
      provide: 'IUrlService',
      useClass: UrlService,
    },
  ],
  exports: [
    {
      provide: 'IUrlService',
      useClass: UrlService,
    },
    {
      provide: 'IUrlRepository',
      useClass: UrlRepository,
    },
  ],
  controllers: [UrlController],
})
export class UrlModule {}
