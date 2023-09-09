import { HttpStatus } from '@nestjs/common';
import TransactionDto from '../../infra/dto/transaction.dto';

interface CreateMultiplesTransactions {
  status: HttpStatus;
  message: string;
  transactions: TransactionDto[];
}

export default CreateMultiplesTransactions;
