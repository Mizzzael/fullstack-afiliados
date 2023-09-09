import {
  Controller,
  FileTypeValidator,
  Get,
  HttpStatus,
  Param,
  ParseFilePipe,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import FileUsecase from '../../../File/domain/usecase/file.usecase';
import TransactionUsecase from '../../domain/usecase/transaction.usecase';
import AuthGuard from '../../../Auth/domain/usecases/guard.usecase';
import UserEntity from '../../../User/domain/entities/user.entity';
import CreateTransactionByString from '../utils/createTransactionByString';
import TransactionDto from '../dto/transaction.dto';
import CreateMultiplesTransactions from '../../domain/contracts/create-multiples-transactions';

@Controller({
  path: 'transaction',
})
class TransactionController {
  constructor(
    private fileRepository: FileUsecase,
    private transactionRepository: TransactionUsecase,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/file')
  @UseInterceptors(FileInterceptor('transactions'))
  async uploadTransactions(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'text/plain' })],
      }),
    )
    file: Express.Multer.File,
    @Res() res: Response,
    @Request() req,
  ) {
    const File = await this.fileRepository.saveFIle(req.user.sub, file);
    const User = new UserEntity();
    User.id = req.user.sub;
    const transactionsList = file.buffer.toString().split('\n');
    const TransactionsList: TransactionDto[] = [];

    for (const ind in transactionsList) {
      if (!transactionsList[ind]) continue;
      const Transaction = CreateTransactionByString(
        User,
        transactionsList[ind],
      );
      Transaction.file = File;
      Transaction.active = true;
      TransactionsList.push(Transaction);
    }

    const responseSaveTransaction =
      await this.transactionRepository.createMultiplesTransactions(
        TransactionsList,
      );

    const transactionsResponse: CreateMultiplesTransactions = {
      status: HttpStatus.CREATED,
      message: 'Sucesso!',
      transactions: responseSaveTransaction,
    };

    res.status(transactionsResponse.status);
    res.json(transactionsResponse);
  }

  @UseGuards(AuthGuard)
  @Get('/:page/:size')
  async getTransactions(
    @Param('page') page: string,
    @Param('size') pageSize: string,
    @Res() res: Response,
    @Request() req,
  ) {
    const results = await this.transactionRepository.getTransactions(
      req.user.sub,
      parseInt(page, 10),
      parseInt(pageSize, 10),
    );

    res.json(results);
  }
}

export default TransactionController;
