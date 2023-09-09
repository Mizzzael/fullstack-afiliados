import { Module } from '@nestjs/common';
import DbModule from '../TypeOrm/db.module';
import FileProvider from './infra/provider/file.provider';
import FileUseCase from './domain/usecase/file.usecase';

@Module({
  imports: [DbModule],
  providers: [...FileProvider, FileUseCase],
  exports: [...FileProvider, FileUseCase],
})
class FileModule {}

export default FileModule;
