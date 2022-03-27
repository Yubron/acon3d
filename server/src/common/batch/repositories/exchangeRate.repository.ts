import { ExchangeRate } from "src/common/entities/exchangeRate.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateExchangeRateDto } from "../dtos/create-exchangeRate.dto";

@EntityRepository(ExchangeRate)
export class ExchangeRateRepository extends Repository<ExchangeRate> {
  insertDailyExchangeRate(exchangeRateDto: CreateExchangeRateDto) {
    this.query(
      `
        INSERT INTO "exchangeRate"
          ("date", "us", "cn")
        VALUES
          ('${exchangeRateDto.date}',${exchangeRateDto.us}, ${exchangeRateDto.cn})
      `
    );
  }

  getTodayHourExchangeRate(date: Date) {
    return this.query(
      `
        SELECT *
        FROM "exchangeRate"
        WHERE date = '${date.toISOString()}'
      `
    );
  }

  getLastExchangeRate() {
    return this.query(
      `
        SELECT *
        FROM "exchangeRate"
        ORDER BY "date" DESC
        LIMIT 1
      `
    );
  }
}