import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentModeEnum } from '../money.dtos';
import { Money } from '../money.entity';
import { MoneyService } from '../money.service';
import { moneyRepositoryMockFactory } from './moneyRepositoryMockFactory';

describe('MoneyService', () => {
  let moneyService: MoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoneyService,
        {
          provide: getRepositoryToken(Money),
          useValue: moneyRepositoryMockFactory,
        },
      ],
    }).compile();

    moneyService = module.get<MoneyService>(MoneyService);
  });

  it('should be defined', () => {
    expect(moneyService).toBeDefined();
  });

  describe('checkBalance', () => {
    it('should return balance amount of money', async () => {
      const balance = await moneyService.checkBalance();
      expect(balance).toEqual(150);
    });
  });

  describe('depositMoney', () => {
    it('should increase money amount', async () => {
      await moneyService.depositMoney({
        paymentMode: PaymentModeEnum.coin,
        amount: 100,
      });
      const balance = await moneyService.checkBalance();
      console.log('balance', balance);
      expect(balance).toEqual(250);
    });
  });
});
