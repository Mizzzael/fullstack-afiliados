import { DataSource } from 'typeorm';
import UserEntity from '../../domain/entities/user.entity';

const userProvider = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (db: DataSource) => {
      return db.getRepository(UserEntity);
    },
    inject: ['DB'],
  },
];

export default userProvider;
