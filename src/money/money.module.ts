import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyController } from './money.controller';
import { Money } from './money.entity';
import { MoneyService } from './money.service';

@Module({
  imports: [TypeOrmModule.forFeature([Money])],
  controllers: [MoneyController],
  providers: [MoneyService],
})
export class MoneyModule {}
