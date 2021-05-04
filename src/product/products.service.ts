import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
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
    try {
      const product: Product = await this.productRepository.save(
        createProductDTO,
      );
      return product;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }
}
