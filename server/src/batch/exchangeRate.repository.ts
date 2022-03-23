import { ExchangeRate } from "src/entities/exchangeRate.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateExchangeRateDto } from "./create-exchangeRate.dto";

@EntityRepository(ExchangeRate)
export class ExchangeRateRepository extends Repository<ExchangeRate> {
  insertDailyExchangeRate(exchangeRateDto: CreateExchangeRateDto) {
    this.query(
      `
        INSERT INTO "exchangeRate"
          ("date", "us", "cn")
        VALUES
          ('${exchangeRateDto.date}', ${exchangeRateDto.us}, ${exchangeRateDto.cn})
      `
    )
  }
}