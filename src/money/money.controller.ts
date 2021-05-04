import { Body, Controller, Get, Post } from '@nestjs/common';
import { DepositMoneyDTO } from './money.dtos';
import { MoneyService } from './money.service';

@Controller('money')
export class MoneyController {
  // TODO: these can be secured to be called by Admin only
  constructor(private moneyService: MoneyService) {}

  @Post('deposit')
  async depositMoney(@Body() depositMoneyDTO: DepositMoneyDTO) {
    return await this.moneyService.depositMoney(depositMoneyDTO);
  }

  @Get('balance')
  async checkBalance() {
    return await this.moneyService.checkBalance();
  }
}
