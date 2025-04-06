import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Account } from './account.entity';
import { BaseEntity } from './base.entity';
import { Category } from './category.entity';

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @ManyToOne(() => Account, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => Category, { nullable: false, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ name: 'category_id' })
  categoryId: string;

  @Column('double precision')
  amount: number;

  @Column('int')
  type: number; // Example: 0 = Expense, 1 = Income, etc.

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdBy?: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedBy?: string;
}
