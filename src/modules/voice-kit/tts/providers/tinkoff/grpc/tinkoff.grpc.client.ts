import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import { loadPackageDefinition, GrpcObject, credentials } from '@grpc/grpc-js';
import { TinkoffGRPCAuth } from './tinkoff.grpc.auth';
import { CreateAuthCredentials } from '../interfaces/tinkoff.interface';
import { VoiceKitTtsTinkoffEnvironmentVariables } from '@app/common/config/interfaces/config.interface';

@Injectable()
export class TinkoffGRPCClient implements OnModuleInit {
    private readonly apiKey: string;
    private readonly secretKey: string;
    private readonly url: string;
    private ttsProto: GrpcObject;
    constructor(private readonly configService: ConfigService) {
        const { apiKey, secretKey, url } = this.configService.get('voiceKit.tts.tinkoff') as VoiceKitTtsTinkoffEnvironmentVariables;
        this.apiKey = apiKey;
        this.secretKey = secretKey;
        this.url = url;
    }

    onModuleInit() {
        this.ttsProto = this.createProto();
    }

    public createTtsClient() {
        const service = this.ttsProto.tinkoff['cloud'].tts.v1;

        const cred = this.createAuthCredentials();

        return new service.TextToSpeech(this.url, credentials.combineChannelCredentials(cred.channel, cred.call));
    }

    private createAuthCredentials(): CreateAuthCredentials {
        return {
            channel: credentials.createSsl(),
            call: credentials.createFromMetadataGenerator(
                TinkoffGRPCAuth.jwtMetadataGenerator(this.apiKey, this.secretKey, 'test_issuer', 'test_subject'),
            ),
        };
    }

    private createProto(): GrpcObject {
        const packageDefinition = loadSync([join(__dirname, '../proto/tts/v1/tts.proto')], {
            keepCase: false,
            longs: String,
            enums: String,
            defaults: true,
            oneofs: true,
        });

        return loadPackageDefinition(packageDefinition);
    }
}
