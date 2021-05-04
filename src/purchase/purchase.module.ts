import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { Purchase } from './purchase.entity';
import { Money } from 'src/money/money.entity';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Money, Product])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
