import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../common/types/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 10 })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  password: string;

  @Column({ nullable: false, unique: true, length: 50 })
  email: string;

  @Column({ nullable: false, length: 50 })
  name: string;

  @Column({ type: 'enum', enum: Role, array: true })
  roles: Role[];

  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP()',
    name: 'created_at',
    nullable: false,
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP()',
    name: 'updated_at',
    nullable: false,
    type: 'timestamp',
  })
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
