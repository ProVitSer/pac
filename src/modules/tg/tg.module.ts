import { Module } from '@nestjs/common';
import { TgConfigController } from './controllers/tg-config.controller';
import { TgService } from './services/tg.service';
import { TgConfig } from './entities/tg-config.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TgUsersController } from './controllers/tg-users.controller';
import { TgUsers } from './entities/tg-users.entity';
import { BotManagerService } from './services/bot-manager.service';
import { TgConfigService } from './services/tg-config.service';
import { TgUsersService } from './services/tg-users.service';
import { TgMissedCallListenters } from './listenters/tg-missed-call.listenters';

@Module({
    imports: [TypeOrmModule.forFeature([TgConfig, TgUsers])],
    providers: [TgService, BotManagerService, TgConfigService, TgUsersService, TgMissedCallListenters],
    controllers: [TgConfigController, TgUsersController],
    exports: [TgService],
})
export class TgModule {}
