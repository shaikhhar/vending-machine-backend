import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createProductDTO } from './create-product-dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async listProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async createProduct(createProductDTO: createProductDTO): Promise<Product> {
    // check if product name already exists
    const existingProduct = await this.productRepository.findOne({
      name: createProductDTO.name,
    });
    if (existingProduct) {
      throw new HttpException('product already exists', HttpStatus.CONFLICT);
    }
    const product: Product = await this.productRepository.save(
      createProductDTO,
    );
    return product;
  }
}
