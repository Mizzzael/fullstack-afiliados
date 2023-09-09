import { Module } from '@nestjs/common';
import dbProvider from './provider/db.provider';

@Module({
  providers: [...dbProvider],
  exports: [...dbProvider],
})
class DbModule {}

export default DbModule;
