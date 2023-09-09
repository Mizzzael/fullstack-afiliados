import { Module } from '@nestjs/common';
import transactionProvider from './infra/provider/transaction.provider';
import DbModule from '../TypeOrm/db.module';
import TransactionUseCase from './domain/usecase/transaction.usecase';
import FileModule from '../File/file.module';

@Module({
  imports: [DbModule, FileModule],
  providers: [...transactionProvider, TransactionUseCase],
  exports: [...transactionProvider, TransactionUseCase],
})
class TransactionModule {}

export default TransactionModule;
