/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Money } from '../../money/money.entity';
import { moneyRepositoryMockFactory } from '../../money/test/moneyRepositoryMockFactory';
import { Product } from '../../product/product.entity';
import { productRepositoryMockFactory, getMockProducts } from '../../product/test/productRepositoryMockFactory';
import { Purchase } from '../purchase.entity';
import { PurchaseService } from '../purchase.service';
import { purchaseRepositoryMockFactory } from './purchaseRepositoryMockFactory';

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PurchaseService,
        {
          provide: getRepositoryToken(Purchase),
          useValue: purchaseRepositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMockFactory
        },
        {
          provide: getRepositoryToken(Money),
          useValue: moneyRepositoryMockFactory
        }
      ],
    }).compile();

    purchaseService = module.get<PurchaseService>(PurchaseService);
  });

  it('should be defined', () => {
    expect(purchaseService).toBeDefined();
  });

});
