import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfigTest: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'vending_machine_test',
  entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
  keepConnectionAlive: true,
};
