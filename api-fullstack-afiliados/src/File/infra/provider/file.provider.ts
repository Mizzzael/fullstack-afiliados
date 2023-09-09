import { DataSource } from 'typeorm';
import FileEntity from '../../domain/entities/file.entity';

const FileProvider = [
  {
    provide: 'FILE_REPOSITORY',
    useFactory(db: DataSource) {
      return db.getRepository(FileEntity);
    },
    inject: ['DB'],
  },
];

export default FileProvider;
