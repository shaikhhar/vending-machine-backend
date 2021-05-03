import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { ProductsService } from '../products.service';
import { productRepositoryMockFactory } from './productRepositoryMockFactory';

describe('ProductService', () => {
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepositoryMockFactory,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
  });

  describe('listProducts', () => {
    it('should return an array of products', async () => {
      const products = await productsService.listProducts();
      expect(products.length).toEqual(2);
    });
  });

  describe('createProduct', () => {
    it('should add product to product list', async () => {
      const products = await productsService.createProduct({
        name: 'Fanta',
        cost: 20,
        quantity: 5,
      });
      expect(
        (await productsService.listProducts()).map((product) => product.name),
      ).toContain('Fanta');
    });
  });
});
