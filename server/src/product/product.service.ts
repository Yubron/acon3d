import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { ApproveProductDto } from './dtos/approve-product.dto';
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

  async approveProduct(approveProductDto: ApproveProductDto, user: User) {
    try {
      const target = await this.productRepository.findOne(approveProductDto.id)
      if(target.status !== 'pending') {
        throw new BadRequestException('요청중인 상태가 아닙니다 !')
      }
      
      return this.productRepository.approveProduct(approveProductDto, user)
    } catch(e) {
      throw e;
    }
  }

  getApprovedProducts(page: number, acceptLanguage: string) {
    try {
      const displayLanguage = this.getDisplayLanguage(acceptLanguage.slice(0,2))
      return this.productRepository.getApprovedProducts(page, displayLanguage)
    } catch(e) {
      throw e;
    } 
  }

  getPendingProducts(page: number) {
    try {
      return this.productRepository.getPendingProducts(page)
    } catch(e) {
      throw e;
    } 
  }

  getDisplayLanguage(acceptLanguage: string) {
    if(acceptLanguage === 'ko') return 'Kr'
    if(acceptLanguage === 'en') return 'Us'
    if(acceptLanguage === 'zh') return 'Cn'
  }
}
