import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'full_name', type: 'varchar' })
  fullName: string;

  @Column({ name: 'email', unique: true, type: 'varchar' })
  email: string;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({ name: 'password', type: 'varchar', nullable: true })
  password?: string | null;
}
