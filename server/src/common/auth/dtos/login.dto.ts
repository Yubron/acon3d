import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsEmail()
  @MinLength(7)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
      /(?=.*\d)(?=.*[a-z]).{8,}/,
      { message: '올바른 비밀번호를 입력해주세요'}
  )
  password: string;
}