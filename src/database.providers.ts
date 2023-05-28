import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import dotenv from 'dotenv'
dotenv.config()

export const typeORMConfig = [
  {
    name: 'default',
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['./entities/*.{js,ts}'],
    synchronize: process.env.VER == 'DEV' ? true : false,
    logging: true,
    keepConnectionAlive: true,
    autoLoadEntities: true,
    charset: 'utf8mb4',
  } as TypeOrmModuleOptions,
]
