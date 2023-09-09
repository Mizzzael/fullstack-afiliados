import TransactionTypes from '../../domain/values/type';
import UserEntity from '../../../User/domain/entities/user.entity';
import FileEntity from '../../../File/domain/entities/file.entity';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class TransactionDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  type: TransactionTypes;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  product: string;

  @IsNotEmpty()
  @IsNumber()
  value: number;

  @IsNotEmpty()
  @IsString()
  seller: string;

  @IsNotEmpty()
  user: UserEntity;

  @IsNotEmpty()
  file: FileEntity;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}

export default TransactionDto;
