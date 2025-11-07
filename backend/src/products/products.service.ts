import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async getProduct(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async createProduct(productData: {
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
  }): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }
}

