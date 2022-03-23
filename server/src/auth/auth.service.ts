import { Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtPayload } from './jwt-payload.interface';
import { AuthRepository } from './repositories/auth.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService
  ){}

  register(registerDto: RegisterDto) {
    try {
      return this.authRepository.create({...registerDto}).save();
    } catch (e) {

    }
  }

  async login(loginDto: LoginDto) {
    const email = await this.authRepository.checkPassword(loginDto);
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  
  
}
