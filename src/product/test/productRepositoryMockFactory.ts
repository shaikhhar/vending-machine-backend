import { Repository } from 'typeorm';
import { createProductDTO } from '../create-product-dto';
import { Product } from '../product.entity';

const productListInitial = [
  {
    id: 1,
    name: 'Coke',
    cost: 20,
    quantity: 10,
  },
  {
    id: 2,
    name: 'Pepsi',
    cost: 25,
    quantity: 10,
  },
];

const toInsert = {
  id: 3,
  name: 'Dew',
  cost: 30,
  quantity: 10,
};

export const productRepositoryMockFactory = {
  find: jest.fn().mockResolvedValue(productListInitial),
  findOne: jest
    .fn()
    .mockImplementation((product: Product) =>
      Promise.resolve(
        productListInitial.find((prod) => prod.name === product.name),
      ),
    ),
  save: jest.fn().mockImplementation((createProductDTO: createProductDTO) => {
    const product = { id: productListInitial.length, ...createProductDTO };
    productListInitial.push(product);
    Promise.resolve(productListInitial);
  }),
};
