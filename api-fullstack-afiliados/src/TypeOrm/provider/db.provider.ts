import { DataSource } from 'typeorm';

const dbProvider = [
  {
    provide: 'DB',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];

export default dbProvider;
