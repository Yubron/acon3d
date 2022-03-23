import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ApproveProductDto {  
  @IsNumber()
  id: number
  
  @IsOptional()
  @IsString()
  titleKr?: string

  @IsOptional()
  @IsString()
  titleUs?: string
  
  @IsOptional()
  @IsString()
  titleCn?: string

  @IsOptional()
  @IsString()
  contentKr?: string
  
  @IsOptional()
  @IsString()
  contentUs?: string

  @IsOptional()
  @IsString()
  contentCn?: string

  @IsOptional()
  @IsNumber()
  price?: number

  @IsNumber()
  commission: number
}