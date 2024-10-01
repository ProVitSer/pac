import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotManagerService } from './bot-manager.service';
import { TgConfigService } from './tg-config.service';
import { Markup } from 'telegraf';
import { TgUsersService } from './tg-users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TgMessages } from '../entities/tg-messages.entity';
import { v1 as uuidv1 } from 'uuid';
import { VoipService } from '@app/modules/voip/services/voip.service';
import { PacExtensionService } from '@app/modules/pac-connector/modules/pac-extension/services/pac-extension.service';
import { AddTgMessageData } from '../interfaces/tg.interface';
import { DAFAULT_MISSED_CALL_END_MESSAGE, DAFAULT_MISSED_CALL_START_MESSAGE } from '../tg.constants';
import { UtilsService } from '@app/common/utils/utils.service';

@Injectable()
export class TgMissedCallService implements OnModuleInit {
    constructor(
        private readonly botManagerService: BotManagerService,
        private readonly tgConfigService: TgConfigService,
        private readonly tgUsersService: TgUsersService,
        @InjectRepository(TgMessages)
        private tgMessagesRepository: Repository<TgMessages>,
        private readonly voipService: VoipService,
        private readonly pacExtensionService: PacExtensionService,
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

    public async sendMissedCallMessage(clientId: number, number: string) {
        const clientTgConfig = await this.tgConfigService.getTgConfigs(clientId);

        for (const tg of clientTgConfig) {
            const messageId = uuidv1();

            const message = `${DAFAULT_MISSED_CALL_START_MESSAGE} ${number}. ${DAFAULT_MISSED_CALL_END_MESSAGE}`;

            await this.addTgMessage({ clientId, messageId, message, tgConfigId: tg.id });

            await this.botManagerService.sendMessageWithExtra(tg.token, tg.chatId, message, {
                reply_markup: Markup.inlineKeyboard([Markup.button.callback('📞 Перезвонить', this.getCallbackAction(messageId, number))])
                    .reply_markup,
            });

            this.missedCallButtonHandler(tg.token, this.getCallbackAction(messageId, number));
        }
    }

    private async missedCallButtonHandler(token: string, callbackAction: string): Promise<void> {
        const bot = this.botManagerService.getBot(token);

        bot.action(callbackAction, async (ctx) => {
            const user = await this.tgUsersService.getTgUserByUsername(ctx.update.callback_query.from.username);

            const { messageId, number } = this.getMessageInfo(ctx.match[0]);

            const tgMessage = await this.tgMessagesRepository.findOne({ where: { messageId } });

            const isExtensionRegister = await this.isExtensionRegister(tgMessage.clientId, user.extension);

            if (user && isExtensionRegister) {
                ctx.deleteMessage(ctx.update.callback_query.message.message_id);

                await this.tgMessagesRepository.update({ messageId }, { tgUserId: user.id });

                await ctx.reply(
                    `Вызов подхватил пользователь @${ctx.update.callback_query.from.username}, сейчас пойдет звонок клиенту на номер ${number}`,
                );

                await this.voipService.makeExternalCall(tgMessage.clientId, UtilsService.formatNumber(number), user.extension);
            }
        });
    }

    private getCallbackAction(messageId: string, number: string): string {
        return `${messageId}-${number}`;
    }

    private async addTgMessage(data: AddTgMessageData): Promise<void> {
        const tgMessage = this.tgMessagesRepository.create();

        tgMessage.clientId = data.clientId;

        tgMessage.messageId = data.messageId;

        tgMessage.message = data.message;

        tgMessage.tgConfigId = data.tgConfigId;

        this.tgMessagesRepository.save(tgMessage);
    }

    private getMessageInfo(callbackActionData: string) {
        const lastDashIndex = callbackActionData.lastIndexOf('-');

        const messageId = callbackActionData.slice(0, lastDashIndex);

        const number = callbackActionData.slice(lastDashIndex + 1);

        return {
            messageId,
            number,
        };
    }

    private async isExtensionRegister(clientId: number, ext: string): Promise<boolean> {
        const extensions = await this.pacExtensionService.getRegisteredExtensions(clientId);

        return extensions.extensions.includes(ext);
    }
}
