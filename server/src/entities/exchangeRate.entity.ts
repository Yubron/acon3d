import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'exchangeRate' })
export class ExchangeRate {
  @PrimaryColumn({name: 'date'})
  date: string

  @Column({name: 'us'})
  us: number

  @Column({name: 'cn'})
  cn: number
}