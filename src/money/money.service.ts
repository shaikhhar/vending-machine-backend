/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { STATUS_CODES } from 'node:http';
import { Repository } from 'typeorm';
import { DepositMoneyDTO, WithdrawMoneyDTO } from './money.dtos';
import { Money } from './money.entity';

@Injectable()
export class MoneyService {
  constructor(
    @InjectRepository(Money) private moneyRepository: Repository<Money>,
  ) {}

  async depositMoney(depositMoneyDTO: DepositMoneyDTO) {
    const { amount, paymentMode } = depositMoneyDTO;
    const money = await this.moneyRepository.findOne({ paymentMode });
    if(money){
        money.amount += amount;
        return await this.moneyRepository.save(money);
        }
    return await this.moneyRepository.save(depositMoneyDTO);    
  }

  async withdrawMoney(withdrawMoneyDTO: WithdrawMoneyDTO) {
    const { amount, paymentMode } = withdrawMoneyDTO;
    const money = await this.moneyRepository.findOne({ paymentMode });
    if (!money) {
      throw new HttpException('Invalid payment method',HttpStatus.UNAUTHORIZED );
    }
    if (money.amount < amount) {
      throw new HttpException('Insufficient Balance', HttpStatus.UNAUTHORIZED);
    }
    money.amount -= amount;
    return await this.moneyRepository.save(money);
  }

  async checkBalance(): Promise<number> {
    const moneys: Money[] = await this.moneyRepository.find();
    const total = moneys.reduce((p, c) => p + c.amount, 0);
    return total;
  }
}
