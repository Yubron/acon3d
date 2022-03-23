import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/entities/user.entity"
import { EntityRepository, Repository } from "typeorm"
import { LoginDto } from "../dtos/login.dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async checkPassword(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.findOne({ email });
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