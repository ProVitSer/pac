import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: ['dist/src/modules/**/entities/*.entity{.ts,.js}', 'dist/src/modules/**/**/*.entities/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations',
    migrationsRun: true,
    synchronize: true,
    autoLoadEntities: true,
    logging: ['error'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
