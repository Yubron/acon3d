import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateExchangeRateDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNumber()
  @IsNotEmpty()
  us: number;

  @IsNumber()
  @IsNotEmpty()
  cn: number;

}