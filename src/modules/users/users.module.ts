import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { ClientModule } from '../client/client.module';
import { UsersController } from './controllers/users.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersNotifications } from './entities/users-notifications.entity';
import { UsersNotificationsController } from './controllers/uses-notifications.controller';
import { UsersNotificationsService } from './services/users-notofications.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users, UsersNotifications]), ClientModule, NotificationsModule],
    providers: [UsersService, UsersNotificationsService],
    controllers: [UsersController, UsersNotificationsController],
    exports: [UsersService],
})
export class UsersModule {}
