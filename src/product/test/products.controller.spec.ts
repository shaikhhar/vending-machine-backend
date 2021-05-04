import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { ormConfigTest } from '../../../test/orm-config-test';
import { Product } from '../product.entity';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { productRepositoryMockFactory } from './productRepositoryMockFactory';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMockFactory,
        },
      ],
    }).compile();

    productsController = moduleRef.get<ProductsController>(ProductsController);
    productsService = moduleRef.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const products = await productsService.listProducts();
      expect(products.length).toEqual(2);
    });
  });

  afterEach(async () => {
    await moduleRef.close();
  });
});
