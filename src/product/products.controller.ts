import { Body, Controller, Get, Post } from '@nestjs/common';
import { createProductDTO } from './create-product-dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private _productService: ProductsService) {}

  @Get('')
  async listProducts() {
    return await this._productService.listProducts();
  }

  @Post('create')
  async createProduct(@Body() createProductDTO: createProductDTO) {
    return await this._productService.createProduct(createProductDTO);
  }
}
