import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwtGuard/jwtAuthGuard';

@Controller('user')
export class UserController {
  
  @Get('/')
  @UseGuards(JwtAuthGuard)
  getUser(@Req() req) {
    delete req.user.password
    return req.user
  }
}
