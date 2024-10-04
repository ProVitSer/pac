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
    files: FileEnvironmentVariables;
    pacConnectorJwt: PacConnectorJwtEnvironmentVariables;
    redis: RedisEnvironmentVariables;
    api: ApiEnvironmentVariables;
    dadata: DadataEnvironmentVariables;
    bull: BullEnvironmentVariables;
    pbx: PbxEnvironmentVariables;
    voiceKit: {
        tts: {
            voiceFileDir: string;
            voiceTmpDir: string;
            tinkoff: VoiceKitTtsTinkoffEnvironmentVariables;
            sber: VoiceKitTtsSberEnvironmentVariables;
        };
        stt: string;
    };
}

export interface VoiceKitTtsSberEnvironmentVariables {
    url: string;
    accessToken: string;
}

export interface VoiceKitTtsTinkoffEnvironmentVariables {
    url: string;
    apiKey: string;
    secretKey: string;
}
export interface PbxEnvironmentVariables {
    extensionLength: number;
    fqdn: string;
    recordingPath: string;
}
export interface BullEnvironmentVariables {
    queueName: string;
    username: string;
    password: string;
    db: number;
}
export interface DadataEnvironmentVariables {
    secret: string;
    apiKey: string;
}

export interface ApiEnvironmentVariables {
    secret: string;
    exp: number;
    algorithm: any;
}
export interface RedisEnvironmentVariables {
    host: string;
    port: string;
    username: string;
    password: string;
}
export interface PacConnectorJwtEnvironmentVariables {
    key: string;
    issuer: string;
    audience: string;
}
export interface FileEnvironmentVariables {
    tmpDir: string;
    audioDir: string;
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
