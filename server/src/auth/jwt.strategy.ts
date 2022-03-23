import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { User } from 'src/entities/user.entity';
import { AuthRepository } from './repositories/auth.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authRepository: AuthRepository,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    
    const user = await this.authRepository.findOne({ email });
    if (!user) {
        throw new UnauthorizedException ("로그인 후 이용해수세요");
    }
    return user;
}
}