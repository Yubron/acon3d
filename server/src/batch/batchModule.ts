import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeRateRepository } from './exchangeRate.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExchangeRateRepository]),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  providers: [TaskService],
})
export class BatchModule { }