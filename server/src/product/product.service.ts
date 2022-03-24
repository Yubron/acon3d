import { BadRequestException, Injectable } from '@nestjs/common';
import { ExchangeRateRepository } from 'src/common/batch/repositories/exchangeRate.repository';
import { ExchangeRate } from 'src/common/entities/exchangeRate.entity';
import { Product } from 'src/common/entities/product.entity';
import { User } from 'src/common/entities/user.entity';
import { ApproveProductDto } from './dtos/approve-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly exchangeRateRepository: ExchangeRateRepository,
  ){}

  createProduct(createProductDto: CreateProductDto, user: User) {
    return this.productRepository.createProduct(createProductDto, user);
  }

  async approveProduct(approveProductDto: ApproveProductDto, user: User) {
    try {
      const setList = []
      setList.push(`"editorId" = ${user.id}`)
      setList.push(`"status" = 'approved'`)
      for (const [key, value] of Object.entries(approveProductDto)) {
        if(key !== 'id') {
          setList.push(`"${key}" = '${value}'`)
        }
      }

      const target = await this.productRepository.findOne(approveProductDto.id)
      if(target.status !== 'pending') {
        throw new BadRequestException('요청중인 상태가 아닙니다 !')
      }
      
      return this.productRepository.approveProduct(setList, approveProductDto.id)
    } catch(e) {
      throw e;
    }
  }

  async getApprovedProducts(page: number, acceptLanguage: string) {
    try {
      const displayLanguage = this.getDisplayLanguage(acceptLanguage.slice(0,2))
      const offset = (page-1) * 30

      const products: Product[] = await this.productRepository.getApprovedProducts(offset, displayLanguage)
      await this.updateDisplayPrice(products, displayLanguage)

      return products;
      // return this.productRepository.getApprovedProducts(offset, displayLanguage)
    } catch(e) {
      throw e;
    } 
  }

  getPendingProducts(page: number) {
    try {
      const offset = (page-1) * 30
      // const products: Product[] = await this.productRepository.getPendingProducts(offset)
      
      return this.productRepository.getPendingProducts(offset)
    } catch(e) {
      throw e;
    } 
  }

  getDisplayLanguage(acceptLanguage: string) {
    if(acceptLanguage === 'ko') return 'Kr'
    if(acceptLanguage === 'en') return 'Us'
    if(acceptLanguage === 'zh') return 'Cn'
  }

  async updateDisplayPrice(products: Product[], displayLanguage: string) {
    const exchangeRate: ExchangeRate = (await this.exchangeRateRepository.getLastExchangeRate())[0]
    
    const {applyExchangeRate, local, option} = 
        displayLanguage === 'Us' ? {applyExchangeRate: exchangeRate.us, local: 'en-US', option: { style: 'currency', currency: 'USD' }}
      : displayLanguage === 'Cn' ? {applyExchangeRate: exchangeRate.cn, local: 'zh-CN', option: { style: 'currency', currency: 'CNY' }}
      : {applyExchangeRate: 1, local: 'ko-KR', option: { style: 'currency', currency: 'KRW' }}

    return products.map(product => {
      const localPrice = product.price / applyExchangeRate
      product['localPrice'] = localPrice.toLocaleString(local, option)
      return product
    })
  }
}
