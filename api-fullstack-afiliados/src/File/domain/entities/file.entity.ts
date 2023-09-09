import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from '../../../User/domain/entities/user.entity';

@Entity({
  name: 'Files',
})
class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'boolean',
  })
  active: boolean;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default FileEntity;
