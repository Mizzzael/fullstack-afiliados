import TransactionEntity from '../../domain/entities/transaction.entity';
import { DataSource } from 'typeorm';

const transactionProvider = [
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (db: DataSource) => {
      return db.getRepository(TransactionEntity);
    },
    inject: ['DB'],
  },
];

export default transactionProvider;
