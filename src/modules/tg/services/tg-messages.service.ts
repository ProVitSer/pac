import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TgMessages } from '../entities/tg-messages.entity';
import { GetTgMessagesQuery, GetTgMessagesResult, TgMessagesData } from '../interfaces/tg.interface';
import { TgUsers } from '../entities/tg-users.entity';
import { format } from 'date-fns';

@Injectable()
export class TgMessagesService {
    constructor(
        @InjectRepository(TgMessages)
        private tgMessagesRepository: Repository<TgMessages>,
    ) {}

    public async getTgMessages(query: GetTgMessagesQuery): Promise<GetTgMessagesResult> {
        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const searchDate = query.dateString || null; //format(new Date(), 'yyyy-MM-dd');

        const queryBuilder = this.tgMessagesRepository
            .createQueryBuilder('tg_messages')
            .leftJoinAndMapOne('tg_messages.tgUser', TgUsers, 'tg_users', 'tg_messages.tgUserId = tg_users.id')
            .select(['tg_messages', 'tg_users'])
            .orderBy('tg_messages.id', 'DESC');

        if (searchDate) {
            queryBuilder.where('DATE(tg_messages.createdAt) = :searchDate', { searchDate });
        }

        if (query.phoneNumber) {
            queryBuilder.andWhere('tg_messages.externalNumber LIKE :phoneNumber', { phoneNumber: `%${query.phoneNumber}%` });
        }

        const totalRecords = await queryBuilder.getCount();

        const tgMessages = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const formattedMessages: TgMessagesData[] = [];

        tgMessages.map((message: any) =>
            formattedMessages.push({
                messageId: message.messageId,
                name: message?.tgUser?.name || '',
                tgUserName: message?.tgUser?.tgUserName || '',
                externalNumber: message.externalNumber || '',
                localExtension: message?.tgUser?.extension || '',
                message: message.message,
                tgUserId: message?.tgUserId ? String(message?.tgUserId) : '',
                date: format(new Date(message.createdAt), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: formattedMessages,
            totalRecords: totalRecords || 0,
        };
    }
}
