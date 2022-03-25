import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from './batch/batch.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BatchModule, AuthModule, UserModule]
})
export class CommonModule {}
