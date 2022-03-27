import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ExchangeRateRepository } from './repositories/exchangeRate.repository';
import { CreateExchangeRateDto } from './dtos/create-exchangeRate.dto';

@Injectable()
export class BatchService implements OnModuleInit {
  onModuleInit() {
    this.getExchangeRate();
  }

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private exchangeRateRepository: ExchangeRateRepository
  ){ }

  @Cron('5 11 * * *', { name: 'getExchangeRate'})
  async getExchangeRate() {
    try {
      if(await this.hasTodayHourExchangeRate()) {
        return;
      }
      
      const url = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${this.configService.get('api.key')}&data=AP01`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      
      const date = new Date(new Date().setHours(new Date().getHours()+9, 0, 0, 0))

      const exchangeRateDto: CreateExchangeRateDto = {
        date: date.toISOString(),
        us: null,
        cn: null
      }

      if(data.length !== 0) {
        data.map(item => {
          if(item.cur_unit === 'USD') {
            exchangeRateDto.us = parseInt(item.deal_bas_r.replace(/,/g, ''));
          }
          if(item.cur_unit ===  'CNH') {
            exchangeRateDto.cn = parseInt(item.deal_bas_r.replace(/,/g, ''));
          }
        })
        this.exchangeRateRepository.insertDailyExchangeRate(exchangeRateDto)
      } else {
        console.log('=== no data ===')
      }    
    } catch(e) {
      throw e;
    }
  }

  async hasTodayHourExchangeRate() {
    try {
      const date = new Date(new Date().setHours(new Date().getHours()+9, 0, 0, 0));
      const exchangeRate = await this.exchangeRateRepository.getTodayHourExchangeRate(date);
 
      if(exchangeRate.length === 0) {
        return false;
      }
      return true;
    } catch(e) {
      throw e
    }
  }
}