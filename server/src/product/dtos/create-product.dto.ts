import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {  
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsString()
  @IsNotEmpty()
  country: string
}