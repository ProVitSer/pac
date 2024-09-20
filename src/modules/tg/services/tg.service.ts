import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotManagerService } from './bot-manager.service';
import { TgConfigService } from './tg-config.service';
import { Client } from '@app/modules/client/entities/client.entity';
import { Markup } from 'telegraf';
import { TgUsersService } from './tg-users.service';

@Injectable()
export class TgService implements OnModuleInit {
    constructor(
        private readonly botManagerService: BotManagerService,
        private readonly tgConfigService: TgConfigService,
        private readonly tgUsersService: TgUsersService,
    ) {}

    async onModuleInit() {
        await this.initializeBots();
    }

    private async initializeBots() {
        const tgCofigList = await this.tgConfigService.getTgConfigList();

        for (const tg of tgCofigList) {
            await this.botManagerService.registerBot(tg.token);
        }
    }

    public async sendMissedCallMessage(client: Client, number: string) {
        const clientTgConfig = await this.tgConfigService.getTgConfigs(client);

        for (const tg of clientTgConfig) {
            const message = `У вас пропущенный звонок от абонента ${number}. Для того чтобы перезвонить, нажмите кнопку ниже.`;

            const callbackAction = `${tg.token}-${number}`;

            const replyMarkup = Markup.inlineKeyboard([Markup.button.callback('📞 Перезвонить', callbackAction)]).reply_markup;

            await this.botManagerService.sendMessageWithExtra(tg.token, tg.chatId, message, {
                reply_markup: replyMarkup,
            });

            this.missedCallButtonHandler(tg.token, callbackAction);
        }
    }

    private async missedCallButtonHandler(token: string, callbackAction: string): Promise<void> {
        const bot = this.botManagerService.getBot(token);

        bot.action(callbackAction, async (ctx) => {
            const user = await this.tgUsersService.getTgUserByUsername(ctx.update.callback_query.from.username);

            if (user) {
                ctx.deleteMessage(ctx.update.callback_query.message.message_id);

                await ctx.reply(
                    `Вызов подхватил пользователь @${ctx.update.callback_query.from.username}, сейчас пойдет звонок клиенту на номер ${ctx.match[0].match(/-(\d+)$/)[1]}! Начнем звонить...`,
                );
            }
        });
    }
}
