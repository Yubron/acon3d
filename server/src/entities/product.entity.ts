import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK값' })
  id: number;

  @Column({ name: 'titleKr', comment: '제목 - 한글', nullable: true })
  titleKr: string;

  @Column({ name: 'titleUs', comment: '제목 - 영문', nullable: true })
  titleUs: string;

  @Column({ name: 'titleCn', comment: '제목 - 중문', nullable: true })
  titleCn: string;

  @Column({ name: 'contentKr', comment: '본문 - 한글', nullable: true })
  contentKr: string;

  @Column({ name: 'contentUs', comment: '본문 - 영문', nullable: true })
  contentUs: string;

  @Column({ name: 'contentCn', comment: '본문 - 중문', nullable: true })
  contentCn: string;

  @Column({ name: 'price', comment: '가격' })
  price: number;

  @Column({ name: 'commission', comment: '수수료', nullable: true })
  commission: number;

  @Column({name: 'status', comment: '상태값 ', default: 'pending'})
  status: string;

  @ManyToOne(() => User, user => user.id, {onDelete: 'CASCADE'})
  @JoinColumn({ name: "writerId" })
  writerId: number;

  @CreateDateColumn({ name: 'createDate', comment: '생성날짜' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updateDate', comment: '수정날짜' })
  updateDate: Date;
}