import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DynamicBotModule } from '../tg-dynamic-bot.module';
import { Telegraf } from 'telegraf';
import { TgBotService } from './tg-bot.service';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { Message } from 'telegraf/typings/core/types/typegram';

@Injectable()
export class BotManagerService {
    private bots = new Map<string, Telegraf<any>>();
    constructor() {}

    public async registerBot(token: string) {
        const app = await NestFactory.createApplicationContext(DynamicBotModule.forRoot(token));

        const botService = app.get(TgBotService);

        this.bots.set(token, botService.bot);
    }

    async sendMessage(token: string, chatId: number, message: string): Promise<Message.TextMessage> {
        const bot = this.bots.get(token);

        if (bot) {
            return await bot.telegram.sendMessage(chatId, message);
        } else {
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
