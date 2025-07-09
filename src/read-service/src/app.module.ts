import { Module } from '@nestjs/common';
import { UrlModule } from './modules/url/url.module';
import { ConfigModule } from '@nestjs/config';
import { config } from './config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    UrlModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
