import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  private readonly productRepository: ProductRepository

  getAll() {
    return this.productRepository.getAll();
  }

  createProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }
}
