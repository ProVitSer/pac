import { DatabaseType } from 'typeorm/driver/types/DatabaseType';
import { AppProtocol, LogLevel } from './config.enum';

export interface ConfigEnvironment {
    appPort: number;
    appProtocol: AppProtocol;
    certsPathFile?: CertsPathFileEnvironmentVariables;
    cors: CorsEnvironmentVariables;
    log: LogEnvironmentVariables;
    database: DatabaseEnvironmentVariables;
}

export interface DatabaseEnvironmentVariables {
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
}

export interface CertsPathFileEnvironmentVariables {
    key: string;
    cert: string;
    ca: string;
}

export interface CorsEnvironmentVariables {
    allowedHeaders: string;
    origin: string[];
    methods: string;
    credentials: boolean;
    maxAge: number;
}

export interface LogEnvironmentVariables {
    level: LogLevel[];
    path: string;
    formatDate: string;
    mixSize: string;
    maxFiles: string;
}
