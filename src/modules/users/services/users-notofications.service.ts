import { Inject, Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { UsersNotifications } from '../entities/users-notifications.entity';
import { INIT_WELCOME_NOTIFICATION } from '../users.constants';
import { NotificationCountList } from '../interfaces/user-notifications.interface';

@Injectable()
export class UsersNotificationsService implements OnModuleInit {
    constructor(
        @InjectRepository(UsersNotifications)
        private readonly usersNotificationsRepository: Repository<UsersNotifications>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    async onModuleInit() {
        const count = await this.usersNotificationsRepository.count();
        if (count === 0) {
            await this.usersNotificationsRepository.save(INIT_WELCOME_NOTIFICATION);
        }
    }

    public async notificationsLimitList(limit: string): Promise<UsersNotifications[]> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [notifications, count] = await this.usersNotificationsRepository.findAndCount({
            where: { deleted: false },
            take: Number(limit),
        });

        return notifications;
    }

    public async notificationsList(limit: string, offset?: string): Promise<NotificationCountList> {
        const skip = offset ? (Number(offset) - 1) * Number(limit) : 0;
        const [notifications, count] = await this.usersNotificationsRepository.findAndCount({
            skip: skip,
            take: Number(limit),
            where: { deleted: false },
        });

        return {
            notifications,
            count,
        };
    }

    public async markReadNotification(ids: number[]): Promise<void> {
        for (const id of ids) {
            await this.usersNotificationsRepository.update(id, { isRead: true });
        }
    }

    public async deleteNotification(notificationId: number): Promise<void> {
        await this.usersNotificationsRepository.update({ id: notificationId }, { deleted: true });
    }
}
