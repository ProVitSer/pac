import { DatabaseType } from 'typeorm/driver/types/DatabaseType';
import { AppProtocol, LogLevel } from './config.enum';

export interface ConfigEnvironment {
    appPort: number;
    appProtocol: AppProtocol;
    certsPathFile?: CertsPathFileEnvironmentVariables;
    cors: CorsEnvironmentVariables;
    log: LogEnvironmentVariables;
    database: DatabaseEnvironmentVariables;
    mail: MailEnvironmentVariables;
    amqp: AmqpEnvironmentVariables;
    jwt: JwtEnvironmentVariables;
}

export interface JwtEnvironmentVariables {
    secret: string;
    exp: string;
}

export interface AmqpEnvironmentVariables {
    hostname: string;
    port: string;
    username: string;
    password: string;
    vhost: string;
}
export interface MailEnvironmentVariables {
    host: string;
    port: number;
    secure: boolean;
    from: string;
    auth: {
        user: string;
        password: string;
    };
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
