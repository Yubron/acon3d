import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, BeforeInsert, BaseEntity } from "typeorm";
import { Product } from "./product.entity";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', comment: 'PK값' })
  id: number;

  @Column({name: 'email', comment: '이메일 주소'})
  email: string;

  @Column({name: 'password', comment: '비밀번호'})
  password: string;
  
  @Column({name: 'role', comment: '역할', default: 'guest' })
  role: string;

  @OneToMany(type => Product, product => product.writerId)
  products: Product[];

  @CreateDateColumn({ name: 'createDate', comment: '생성날짜' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updateDate', comment: '수정날짜' })
  updateDate: Date;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 9);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.compare(password, this.password);
    return hash;
  }
}