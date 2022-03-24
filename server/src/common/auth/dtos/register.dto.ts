import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";

enum UserRoleType {
  GUEST = 'guest',
  WRITER = 'writer',
  EDITOR = 'editor'
}

export class RegisterDto {
  @IsEmail({}, { message: '올바른 형식의 이메일을 입력해주세요' })
  @MinLength(7)
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, {
    message: '올바른 비밀번호를 입력해주세요',
  })
  password: string;

  @IsString()
  @IsEnum(UserRoleType)
  role: UserRoleType;
}