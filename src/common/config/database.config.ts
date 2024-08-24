import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseEnvironmentVariables } from './interfaces/config.interface';
import * as path from 'path';

export function databaseConfig(config: ConfigService): TypeOrmModuleOptions {
    const databaseConfig = config.get('database') as DatabaseEnvironmentVariables;

    return {
        type: databaseConfig.type as any,
        host: databaseConfig.host,
        port: databaseConfig.port,
        username: databaseConfig.username,
        password: databaseConfig.password,
        database: databaseConfig.database,
        entities: [path.join(__dirname + '/../../modules/' + '/**/entities/*.entity{.ts,.js}')],
        synchronize: false,
        logging: true,
    };
}
