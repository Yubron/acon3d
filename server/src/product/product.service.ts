import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository
  ){}

  createProduct(createProductDto: CreateProductDto, user: User) {
    return this.productRepository.createProduct(createProductDto, user);
  }
}
