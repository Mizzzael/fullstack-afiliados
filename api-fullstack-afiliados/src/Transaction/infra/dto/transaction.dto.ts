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
import {ApiProperty} from "@nestjs/swagger";

class TransactionDto {

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(TransactionTypes)
  type: TransactionTypes;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  product: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  value: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  seller: string;

  @ApiProperty()
  @IsNotEmpty()
  user: UserEntity;

  @ApiProperty()
  @IsNotEmpty()
  file: FileEntity;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  active: boolean;
}

export default TransactionDto;
