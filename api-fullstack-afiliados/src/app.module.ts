import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import UserModule from './User/user.module';
import TransactionModule from './Transaction/transaction.module';
import DbModule from './TypeOrm/db.module';
import AuthModule from './Auth/auth.module';
import AuthController from './Auth/infra/controller/auth.controller';
import UserController from './User/infra/controllers/user.controller';
import TransactionController from './Transaction/infra/controllers/transaction.controller';
import FileModule from './File/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DbModule,
    AuthModule,
    UserModule,
    TransactionModule,
    FileModule,
  ],
  controllers: [AuthController, UserController, TransactionController],
})
export class AppModule {}
