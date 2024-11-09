import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DynamicBotModule } from '../tg-dynamic-bot.module';
import { Telegraf } from 'telegraf';
import { TgBotService } from './tg-bot.service';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Message } from 'telegraf/typings/core/types/typegram';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { TgConfig } from '../entities/tg-config.entity';

@Injectable()
export class BotManagerService {
    private bots = new Map<string, Telegraf<any>>();
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    public async registerBot(token: string) {
        const app = await NestFactory.createApplicationContext(DynamicBotModule.forRoot(token));

        const botService = app.get(TgBotService);

        this.bots.set(token, botService.bot);
    }

    public async reinacializeBots(tgCofigList: TgConfig[]) {
        this.bots = new Map<string, Telegraf<any>>();

        for (const tg of tgCofigList) {
            const app = await NestFactory.createApplicationContext(DynamicBotModule.forRoot(tg.token));

            const botService = app.get(TgBotService);

            this.bots.set(tg.token, botService.bot);
        }
    }

    public async sendMessage(token: string, chatId: number | string, message: string): Promise<Message.TextMessage> {
        const bot = this.bots.get(token);

        if (bot) {
            return await bot.telegram.sendMessage(chatId, message);
        } else {
            this.logger.error(`Bot with token ${token} not found`);
            throw new Error(`Bot with token ${token} not found`);
        }
    }

    public async sendMessageWithExtra(
        token: string,
        chatId: number | string,
        message: string,
        extra: ExtraReplyMessage,
    ): Promise<Message.TextMessage> {
        const bot = this.bots.get(token);

        if (bot) {
            return await bot.telegram.sendMessage(chatId, message, extra);
        } else {
            this.logger.error(`Bot with token ${token} not found`);
            throw new Error(`Bot with token ${token} not found`);
        }
    }

    public getBot(token: string): Telegraf<any> | undefined {
        return this.bots.get(token);
    }

    public getBots() {
        return this.bots;
    }
}
