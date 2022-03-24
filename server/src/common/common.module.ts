import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [BatchModule, AuthModule]
})
export class CommonModule {}
