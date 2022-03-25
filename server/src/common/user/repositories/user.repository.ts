import { User } from "src/common/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepostiory extends Repository<User> {
  getUser() {
    return this.query(
      `
        SELECT "user"."email", "user"."role"
        FROM "user"
        
      `
    )
  }
}