import { Body, Controller, DefaultValuePipe, Get, Headers, Post, Query, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/auth/jwtGuard/jwtAuthGuard';
import { Roles } from 'src/common/auth/roleGuard/roles.decorator';
import { RolesGuard } from 'src/common/auth/roleGuard/roles.guard';
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
  createProduct(@Req() req: any, @Body() createProductDto: CreateProductDto, @Headers() header) {
    return this.productService.createProduct(createProductDto, req.user, header['accept-language']);
  }

  @Post('/approve')
  @Roles(ROLES.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  approveProduct(@Req() req: any, @Body() approveProductDto: ApproveProductDto) {
    return this.productService.approveProduct(approveProductDto, req.user);
  }

  @Get('/')
  getApprovedProducts(@Query('page', new DefaultValuePipe(1)) page: number = 1, @Headers() header) {
    return this.productService.getApprovedProducts(page, header['accept-language']);
  }

  @Get('/status/pending')
  @Roles(ROLES.EDITOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getPendingProducts(@Query('page', new DefaultValuePipe(1)) page: number = 1) {
    return this.productService.getPendingProducts(page);
  }
}
