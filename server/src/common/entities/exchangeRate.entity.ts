import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'exchangeRate' })
export class ExchangeRate {
  @PrimaryColumn({name: 'date'})
  date: Date

  @Column({name: 'us'})
  us: number

  @Column({name: 'cn'})
  cn: number
}