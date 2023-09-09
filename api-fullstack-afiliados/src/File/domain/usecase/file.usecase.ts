import { Inject, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Repository } from 'typeorm';
import FileEntity from '../entities/file.entity';
import UserEntity from '../../../User/domain/entities/user.entity';

@Injectable()
class FileUseCase {
  constructor(
    @Inject('FILE_REPOSITORY')
    private fileRepository: Repository<FileEntity>,
  ) {}
  async saveFIle(userId: number, file: Express.Multer.File) {
    const nowDate = new Date();
    const fileName = `${nowDate.getTime()}-${file.originalname}`;
    const FileStream = fs.createWriteStream(
      path.join(
        __dirname,
        `../../../../src/uploads/transactions/${fileName.trim()}`,
      ),
      {
        flags: 'w',
      },
    );
    FileStream.write(file.buffer.toString());
    FileStream.close();
    const NewFile = new FileEntity();
    NewFile.active = true;
    NewFile.name = fileName;

    const User = new UserEntity();
    User.id = userId;

    NewFile.user = User;

    return await this.fileRepository.save(NewFile);
  }
}

export default FileUseCase;
