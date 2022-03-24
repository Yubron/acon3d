import { UnauthorizedException } from "@nestjs/common";
import { User } from "src/common/entities/user.entity"
import { EntityRepository, Repository } from "typeorm"
import { LoginDto } from "../dtos/login.dto";

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  
}