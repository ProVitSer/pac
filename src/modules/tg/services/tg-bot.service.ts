import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TgBotService {
    constructor(@InjectBot() public bot: Telegraf<Context>) {}

    async sendMessage(chatId: number, message: string) {
        await this.bot.telegram.sendMessage(chatId, message);
    }
}
