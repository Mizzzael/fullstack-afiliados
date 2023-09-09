import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import TransactionEntity from '../entities/transaction.entity';
import TransactionDto from '../../infra/dto/transaction.dto';

@Injectable()
class TransactionUseCase {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createMultiplesTransactions(multipleTransactions: TransactionDto[]) {
    for (const ind in multipleTransactions) {
      if (!multipleTransactions[ind]) continue;
      const NewTransaction = new TransactionEntity();
      const Transaction = multipleTransactions[ind];
      NewTransaction.type = Transaction.type;
      NewTransaction.seller = Transaction.seller;
      NewTransaction.date = Transaction.date;
      NewTransaction.product = Transaction.product;
      NewTransaction.value = Transaction.value;
      NewTransaction.user = Transaction.user;
      NewTransaction.active = true;
      NewTransaction.filetxt = Transaction.file;
      const queryResult = await this.transactionRepository.save(NewTransaction);
      multipleTransactions[ind].id = queryResult.id;
    }

    return multipleTransactions;
  }

  async getTransactions(userId: number, page: number, pageSize: number) {
    const [result, total] = await this.transactionRepository.findAndCount({
      where: {
        userId: userId,
        active: true,
      },
      relations: {
        filetxt: true,
      },
      order: {
        id: 'DESC',
      },
      take: pageSize,
      skip: pageSize * (page - 1),
    });

    return {
      result,
      total,
    };
  }
}

export default TransactionUseCase;
