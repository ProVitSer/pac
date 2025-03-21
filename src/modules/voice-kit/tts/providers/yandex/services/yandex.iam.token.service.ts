import { Inject, Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExecException, exec } from 'child_process';
import { writeFile, readFile } from 'fs/promises';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { join } from 'path';

@Injectable()
export class YandexTTSIAMTokenService implements OnModuleInit {
    constructor(
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    async onModuleInit() {
        const iamToken = await this.refreshIAMToken();
        await this.saveToken(iamToken);
    }

    public async refreshIAMToken(): Promise<string> {
        try {
            const folderId = this.configService.get('voiceKit.tts.yandex.folderId');

            const token = await new Promise<string>(function (resolve, reject) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                exec(`yc iam create-token --folder-id ${folderId}`, (error: ExecException, stdout, stderr: string) => {
                    if (!!stdout) {
                        resolve(stdout.replace(/\n/g, ''));
                    }
                    reject(error);
                });
            });

            await this.saveToken(token);

            return token;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async getIAMToken(): Promise<string> {
        try {
            const token = JSON.parse(
                (
                    await readFile(`${join(__dirname, '../..', this.configService.get('voiceKit.tts.yandex.tokenFolder'))}/token.json`)
                ).toString(),
            );
            return token.iamToken;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async saveToken(token: string): Promise<void> {
        try {
            await writeFile(
                `${join(__dirname, '../..', this.configService.get('voiceKit.tts.yandex.tokenFolder'))}/token.json`,
                JSON.stringify({ iamToken: token }),
            );
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
