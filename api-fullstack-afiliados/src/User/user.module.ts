import { Module } from '@nestjs/common';
import userProvider from './infra/provider/user.provider';
import UserUseCase from './domain/usecase/user.usecase';
import DbModule from '../TypeOrm/db.module';

@Module({
  imports: [DbModule],
  providers: [...userProvider, UserUseCase],
  exports: [...userProvider, UserUseCase],
})
class UserModule {}

export default UserModule;
