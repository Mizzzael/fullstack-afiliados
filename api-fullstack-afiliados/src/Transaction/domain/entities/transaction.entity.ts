import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import TransactionTypes from '../values/type';
import UserEntity from '../../../User/domain/entities/user.entity';
import FileEntity from '../../../File/domain/entities/file.entity';

@Entity({
  name: 'Transactions',
})
class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: TransactionTypes,
    type: 'enum',
  })
  type: string;

  @Column()
  date: Date;

  @Column({
    type: 'varchar',
  })
  product: string;

  @Column({
    type: 'float',
  })
  value: number;

  @Column({
    type: 'varchar',
  })
  seller: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({
    type: 'int',
  })
  userId?: number;

  @ManyToOne(() => FileEntity)
  @JoinColumn()
  filetxt: FileEntity;

  @Column({
    type: 'int',
  })
  filetxtId?: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default TransactionEntity;
