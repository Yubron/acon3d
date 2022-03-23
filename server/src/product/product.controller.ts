import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/guard/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwtAuthGuard';
import { ROLES } from 'src/common/constants/roles';
import { ApproveProductDto } from './dtos/approve-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  
  @Post('/')
  @Roles(ROLES.WRITER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  createProduct(@Req() req: any, @Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto, req.user)
  }

  @Post('/approve')
  @Roles(ROLES.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approveProduct(@Req() req: any, @Body() approveProductDto: ApproveProductDto) {
    return this.productService.approveProduct(approveProductDto, req.user)
  }
}