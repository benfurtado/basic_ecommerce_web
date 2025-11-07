import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

export class CreateProductDto {
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') id: number) {
    return this.productsService.getProduct(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }
}

