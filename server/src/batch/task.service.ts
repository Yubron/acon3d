import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ExchangeRateRepository } from './exchangeRate.repository';
import { CreateExchangeRateDto } from './create-exchangeRate.dto';

@Injectable()
export class TaskService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
    private exchangeRateRepository: ExchangeRateRepository
  ){}


  // @Cron('5 11 * * *', { name: 'getExchangeRate' })
  @Cron('*/10 * * * * *', { name: 'getExchangeRate' })
  async getExchangeRate() {
    const url = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${this.configService.get('api.key')}&data=AP01`;
    const { data } = await firstValueFrom(this.httpService.get(url));
    const today = new Date()

    const exchangeRateDto: CreateExchangeRateDto = {
      date: today.toISOString().split('.')[0],
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
  }
}