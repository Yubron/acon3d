import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateRepository } from 'src/common/batch/repositories/exchangeRate.repository';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './repositories/product.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository, ExchangeRateRepository])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
