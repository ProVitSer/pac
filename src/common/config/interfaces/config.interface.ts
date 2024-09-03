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
    voip: VoipEnvironmentVariables;
}

export interface VoipEnvironmentVariables {
    asterisk: AsteriskEnvironmentVariables;
}

export interface AsteriskEnvironmentVariables {
    ami: {
        providerName: string;
        host: string;
        port: number;
        username: string;
        secret: string;
        logLevel?: number;
    };
    ari: AsteriskAriEnvironmentVariables[];
}

export interface AsteriskAriEnvironmentVariables {
    providerName: string;
    host: string;
    port: number;
    stasis: string;
    user: string;
    password: string;
}

export interface JwtEnvironmentVariables {
    secret: string;
    exp: number;
    algorithm: any;
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
