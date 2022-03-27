import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BatchService } from './batch.service';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateRepository } from './repositories/exchangeRate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRateRepository]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [BatchService],
})
export class BatchModule { }