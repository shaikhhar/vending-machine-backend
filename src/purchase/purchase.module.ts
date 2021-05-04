import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { Money } from '../money/money.entity';
import { Product } from '../product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Money, Product])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
