/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentModeEnum } from '../money.dtos';
import { Money } from '../money.entity';
import { MoneyService } from '../money.service';
import { moneyRepositoryMockFactory, setMockMoney } from './moneyRepositoryMockFactory';

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
    setMockMoney();
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
      expect(balance).toEqual(250);
    });
  });

  describe('withDrawMoney', () => {
    it('should reduce money amount', async () => {
      await moneyService.withdrawMoney({
        paymentMode: PaymentModeEnum.coin,
        amount: 50,
      });
      const balance = await moneyService.checkBalance();
      expect(balance).toEqual(100);
    });

    it('should throw error if withdraw amount more than balance', async () => {
      try {
        await moneyService.withdrawMoney({
          paymentMode: PaymentModeEnum.coin,
          amount: 150,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException)
      }
    })
  });
});
