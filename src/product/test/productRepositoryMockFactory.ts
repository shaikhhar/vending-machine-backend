/* eslint-disable prettier/prettier */
import { createProductDTO } from '../create-product-dto';
import { Product } from '../product.entity';

let mockProducts = [
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

export const getMockProducts = () => mockProducts;

export const productRepositoryMockFactory = {
  find: jest.fn().mockImplementation(() => Promise.resolve(mockProducts)),
  findOne: jest
    .fn()
    .mockImplementation((product:{name: string}) =>
      Promise.resolve(
        mockProducts.find((prod) => prod.name === product.name),
      ),
    ),
  save: jest.fn().mockImplementation( (createProductDTO: createProductDTO) => {
    const productIndex = mockProducts.findIndex(product => product.name === createProductDTO.name);
    if(productIndex === -1){
      const product = { id: mockProducts.length, ...createProductDTO };
      mockProducts = [...mockProducts, product] ;
      
    }else {
      const existingProduct = mockProducts[productIndex];
      const updatedProduct = { ...existingProduct, ...createProductDTO };
      mockProducts.splice(productIndex, 1, updatedProduct );
    }    
    Promise.resolve(mockProducts);
  }),
};
