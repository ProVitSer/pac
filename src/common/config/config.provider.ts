import { getEnv } from '../utils';
import { AppProtocol, LogLevel, NodeEnvType } from './interfaces/config.enum';
import { ConfigEnvironment } from './interfaces/config.interface';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export default (): ConfigEnvironment => {
    switch (String(getEnv())) {
        case NodeEnvType.prod:
            return PROD_CONF;
        case NodeEnvType.development:
            return DEV_CONF;
    }
};

const DEV_CONF: ConfigEnvironment = {
    appPort: 3000,
    appProtocol: AppProtocol.http,
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
        path: './app-log/',
        formatDate: 'YYYY-MM-DD',
        mixSize: '20m',
        maxFiles: '14d',
        level: [LogLevel.console, LogLevel.info, LogLevel.error],
    },
    database: {
        type: 'postgres' as any,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    mail: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: !!process.env.MAIL_SECURE,
        from: process.env.MAIL_FROM,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            password: process.env.MAIL_AUTH_PASSWORD,
        },
    },
    amqp: {
        hostname: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASS,
        vhost: process.env.RABBITMQ_VHOST,
    },
    jwt: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        exp: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        algorithm: 'HS256',
    },
    voip: {
        asterisk: {
            ami: {
                providerName: process.env.ASTERISK_AMI_PROVIDER_NAME,
                host: process.env.ASTERISK_AMI_HOST,
                port: parseInt(process.env.ASTERISK_AMI_PORT),
                username: process.env.ASTERISK_AMI_CALL_USER,
                secret: process.env.ASTERISK_AMI_CALL_PASSWORD,
                logLevel: parseInt(process.env.ASTERISK_AMI_LOG_LEVEL) || 1,
            },
            ari: [
                {
                    providerName: process.env.ASTERISK_ARI_CALL_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_CALL_USER,
                    user: process.env.ASTERISK_ARI_CALL_USER,
                    password: process.env.ASTERISK_ARI_CALL_PASSWORD,
                },
                {
                    providerName: process.env.ASTERISK_ARI_INFO_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_INFO,
                    user: process.env.ASTERISK_ARI_INFO,
                    password: process.env.ASTERISK_ARI_INFO_PASSWORD,
                },

                {
                    providerName: process.env.ASTERISK_ARI_CQA_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_CQA,
                    user: process.env.ASTERISK_ARI_CQA,
                    password: process.env.ASTERISK_ARI_CQA_PASSWORD,
                },
            ],
        },
    },
    files: {
        tmpDir: process.env.FILES_TMP_DIR,
        audioDir: process.env.FILES_AUDIO_DIR,
    },
    pacConnectorJwt: {
        key: process.env.PAC_JWT_KEY,
        audience: process.env.PAC_JWT_AUDIENCE,
        issuer: process.env.PAC_JWT_ISSUER,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: '6379',
        username: process.env.REDIS_USER,
        password: process.env.REDIS_USER_PASSWORD,
    },
    api: {
        secret: process.env.API_TOKEN_SECRET,
        exp: parseInt(process.env.API_TOKEN_EXPIRATION_TIME),
        algorithm: 'HS256',
    },
    dadata: {
        secret: process.env.DADATA_API_SECRET,
        apiKey: process.env.DADATA_API_KEY,
    },
    bull: {
        queueName: process.env.BULL_QUEUE,
        username: process.env.BULL_REDIS_USERNAME,
        password: process.env.BULL_REDIS_PASSWORD,
        db: parseInt(process.env.BULL_DB),
    },
    pbx: {
        extensionLength: parseInt(process.env.PBX_EXTENSION_LENGTH),
        fqdn: process.env.PBX_FQDN,
        recordingPath: process.env.PBX_RECORDING_PATH,
    },
    voiceKit: {
        tts: {
            voiceFileDir: process.env.TTS_VOICE_FILE_DIR,
            voiceTmpDir: process.env.TTS_VOICE_TMP_DIR,
            tinkoff: {
                url: process.env.TINKOFF_TTS_URL,
                apiKey: process.env.TINKOFF_TTS_API_KEY,
                secretKey: process.env.TINKOFF_TTS_SECRET_KEY,
            },
            sber: {
                url: process.env.SBER_TTS_URL,
                accessToken: process.env.SBER_TTS_ACCESS_TOKEN,
            },
            yandex: {
                url: process.env.YANDEX_TTS_URL,
                folderId: process.env.YANDEX_TTS_FOLDER_ID,
                tokenFolder: process.env.YANDEX_TTS_TOKEN_FOLDER,
            },
        },
        stt: {
            voiceFileDir: process.env.STT_VOICE_FILE_DIR,
            voiceTmpDir: process.env.STT_VOICE_TMP_DIR,
            sber: {
                url: process.env.SBER_STT_URL,
                accessToken: process.env.SBER_STT_ACCESS_TOKEN,
            },
            yandex: {
                apiKey: process.env.YANDEX_STT_API_KEY,
                tokenFolder: process.env.YANDEX_STT_TOKEN_FOLDER,
                s3: {
                    backetPath: process.env.YANDEX_STT_S3_BACKET_PATH_NAME,
                    accessKeyId: process.env.YANDEX_STT_S3_BACKET_ACCESS_KEY_ID,
                    secretAccessKey: process.env.YANDEX_STT_S3_BACKET_SECRET_ACCESS_KEY,
                    region: process.env.YANDEX_STT_S3_BACKET_REGION,
                    endpoint: process.env.YANDEX_STT_S3_BACKET_ENDPOINT,
                },
            },
        },
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
    mail: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: !!process.env.MAIL_SECURE,
        from: process.env.MAIL_FROM,
        auth: {
            user: process.env.MAIL_AUTH_USER,
            password: process.env.MAIL_AUTH_PASSWORD,
        },
    },
    amqp: {
        hostname: process.env.RABBITMQ_HOST,
        port: process.env.RABBITMQ_PORT,
        username: process.env.RABBITMQ_USER,
        password: process.env.RABBITMQ_PASS,
        vhost: process.env.RABBITMQ_VHOST,
    },
    jwt: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        exp: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME),
        algorithm: 'HS256',
    },
    voip: {
        asterisk: {
            ami: {
                providerName: process.env.ASTERISK_AMI_PROVIDER_NAME,
                host: process.env.ASTERISK_AMI_HOST,
                port: parseInt(process.env.ASTERISK_AMI_PORT),
                username: process.env.ASTERISK_AMI_CALL_USER,
                secret: process.env.ASTERISK_AMI_CALL_PASSWORD,
                logLevel: parseInt(process.env.ASTERISK_AMI_LOG_LEVEL) || 1,
            },
            ari: [
                {
                    providerName: process.env.ASTERISK_ARI_CALL_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_CALL_USER,
                    user: process.env.ASTERISK_ARI_CALL_USER,
                    password: process.env.ASTERISK_ARI_CALL_PASSWORD,
                },
                {
                    providerName: process.env.ASTERISK_ARI_INFO_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_INFO,
                    user: process.env.ASTERISK_ARI_INFO,
                    password: process.env.ASTERISK_ARI_INFO_PASSWORD,
                },
                {
                    providerName: process.env.ASTERISK_ARI_CQA_PROVIDER_NAME,
                    host: process.env.ASTERISK_ARI_HOST,
                    port: parseInt(process.env.ASTERISK_ARI_PORT),
                    stasis: process.env.ASTERISK_ARI_CQA,
                    user: process.env.ASTERISK_ARI_CQA,
                    password: process.env.ASTERISK_ARI_CQA_PASSWORD,
                },
            ],
        },
    },
    files: {
        tmpDir: process.env.FILES_TMP_DIR,
        audioDir: process.env.FILES_AUDIO_DIR,
    },
    pacConnectorJwt: {
        key: process.env.PAC_JWT_KEY,
        audience: process.env.PAC_JWT_AUDIENCE,
        issuer: process.env.PAC_JWT_ISSUER,
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: '6379',
        username: process.env.REDIS_USER,
        password: process.env.REDIS_USER_PASSWORD,
    },
    api: {
        secret: process.env.API_TOKEN_SECRET,
        exp: parseInt(process.env.API_TOKEN_EXPIRATION_TIME),
        algorithm: 'HS256',
    },
    dadata: {
        secret: process.env.DADATA_API_SECRET,
        apiKey: process.env.DADATA_API_KEY,
    },
    bull: {
        queueName: process.env.BULL_QUEUE,
        username: process.env.BULL_REDIS_USERNAME,
        password: process.env.BULL_REDIS_PASSWORD,
        db: parseInt(process.env.BULL_DB),
    },
    pbx: {
        extensionLength: parseInt(process.env.PBX_EXTENSION_LENGTH),
        fqdn: process.env.PBX_FQDN,
        recordingPath: process.env.PBX_RECORDING_PATH,
    },
    voiceKit: {
        tts: {
            voiceFileDir: process.env.TTS_VOICE_FILE_DIR,
            voiceTmpDir: process.env.TTS_VOICE_TMP_DIR,
            tinkoff: {
                url: process.env.TINKOFF_TTS_URL,
                apiKey: process.env.TINKOFF_TTS_API_KEY,
                secretKey: process.env.TINKOFF_TTS_SECRET_KEY,
            },
            sber: {
                url: process.env.SBER_TTS_URL,
                accessToken: process.env.SBER_TTS_ACCESS_TOKEN,
            },
            yandex: {
                url: process.env.YANDEX_TTS_URL,
                folderId: process.env.YANDEX_TTS_FOLDER_ID,
                tokenFolder: process.env.YANDEX_TTS_TOKEN_FOLDER,
            },
        },
        stt: {
            voiceFileDir: process.env.STT_VOICE_FILE_DIR,
            voiceTmpDir: process.env.STT_VOICE_TMP_DIR,
            sber: {
                url: process.env.SBER_STT_URL,
                accessToken: process.env.SBER_STT_ACCESS_TOKEN,
            },
            yandex: {
                apiKey: process.env.YANDEX_STT_API_KEY,
                tokenFolder: process.env.YANDEX_STT_TOKEN_FOLDER,
                s3: {
                    backetPath: process.env.YANDEX_STT_S3_BACKET_PATH_NAME,
                    accessKeyId: process.env.YANDEX_STT_S3_BACKET_ACCESS_KEY_ID,
                    secretAccessKey: process.env.YANDEX_STT_S3_BACKET_SECRET_ACCESS_KEY,
                    region: process.env.YANDEX_STT_S3_BACKET_REGION,
                    endpoint: process.env.YANDEX_STT_S3_BACKET_ENDPOINT,
                },
            },
        },
    },
};
