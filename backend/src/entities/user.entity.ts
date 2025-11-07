import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  otp: string;

  @Column({ nullable: true })
  otpExpiry: Date;

  @CreateDateColumn()
  createdAt: Date;
}

