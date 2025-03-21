/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromotionModule } from './merchant/promotion/promotion.module';

@Module({
  imports: [PromotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
