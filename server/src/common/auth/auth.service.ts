import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtPayload } from './jwtGuard/jwt-payload.interface';
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
    const email = await this.checkPassword(loginDto);
    const payload: JwtPayload = { email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async checkPassword(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.authRepository.findOne({ email });
    if (!user) throw new UnauthorizedException('이메일이 존재하지 않습니다.');

    if (user && (await user.validatePassword(password))) {
      return user.email;
    } else {
      throw new UnauthorizedException(
        '비밀번호가 잘못 입력 되었습니다. 비밀번호를 정확히 입력해 주세요.',
      );
    }
  }
}
