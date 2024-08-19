import { getEnv } from '../utils';
import { AppProtocol, LogLevel, NodeEnvType } from './interfaces/config.enum';
import { ConfigEnvironment } from './interfaces/config.interface';
import { config as dotenvConfig } from 'dotenv';

export default (): ConfigEnvironment => {
    switch (String(getEnv())) {
        case NodeEnvType.prod:
            dotenvConfig({ path: '.env' });
            return PROD_CONF;
        case NodeEnvType.development:
            return DEV_CONF;
    }
};

const DEV_CONF: ConfigEnvironment = {
    appPort: 3000,
    appProtocol: AppProtocol.http,
    cors: {
        allowedHeaders:
            'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Authorization',
        origin: ['*'],
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        credentials: true,
        maxAge: 3600,
    },
    log: {
        path: './app-log/',
        formatDate: 'YYYY-MM-DD',
        mixSize: '20m',
        maxFiles: '14d',
        level: [LogLevel.console, LogLevel.info, LogLevel.error],
    },
    database: {
        type: 'postgres' as any,
        host: 'localhost',
        port: 5432,
        username: 'postgres_user',
        password: 'verySecretPasswd',
        database: 'check_doc',
    },
};

const PROD_CONF: ConfigEnvironment = {
    appPort: Number(`${process.env.APP_PORT}`),
    appProtocol: `${process.env.HTTP_OPTIONS}` as AppProtocol,
    certsPathFile: {
        key: `${process.env.CERT_KEY_PATH_FILE}`,
        ca: `${process.env.CERT_CA_PATH_FILE}`,
        cert: `${process.env.CERT_CERT_PATH_FILE}`,
    },
    cors: {
        allowedHeaders:
            'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Authorization',
        origin: ['*'],
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        credentials: true,
        maxAge: 3600,
    },
    log: {
        path: './api-log/',
        formatDate: 'YYYY-MM-DD',
        mixSize: '20m',
        maxFiles: '14d',
        level: [LogLevel.info],
    },
    database: {
        type: 'postgres' as any,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
};
