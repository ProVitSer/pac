import { Module } from '@nestjs/common';
import { TgConfigController } from './controllers/tg-config.controller';
import { TgMissedCallService } from './services/tg-missed-call.service';
import { TgConfig } from './entities/tg-config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TgUsersController } from './controllers/tg-users.controller';
import { TgUsers } from './entities/tg-users.entity';
import { BotManagerService } from './services/bot-manager.service';
import { TgConfigService } from './services/tg-config.service';
import { TgUsersService } from './services/tg-users.service';
import { TgMissedCallListenters } from './listenters/tg-missed-call.listenters';
import { TgMessages } from './entities/tg-messages.entity';
import { VoipModule } from '../voip/voip.module';
import { PacExtensionModule } from '../pac-connector/modules/pac-extension/pac-extension.module';
import { TgMessagesService } from './services/tg-messages.service';
import { TgMessagesController } from './controllers/tg-messages.controller';

@Module({
    imports: [TypeOrmModule.forFeature([TgConfig, TgUsers, TgMessages]), VoipModule, PacExtensionModule],
    providers: [TgMissedCallService, BotManagerService, TgConfigService, TgUsersService, TgMissedCallListenters, TgMessagesService],
    controllers: [TgConfigController, TgUsersController, TgMessagesController],
    exports: [TgMissedCallService],
})
export class TgModule {}
