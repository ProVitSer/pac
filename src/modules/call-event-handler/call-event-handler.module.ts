import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { bullConfig } from '@app/common/config/bull.config';
import { CallEventHandlerService } from './services/call-event-handler.service';
import { CallProcessor } from './services/call-processor.service';
import { СallEventHandlerListenters } from './listenters/call-event-handler.listenters';
import configuration from '@app/common/config/config.provider';

@Module({
    imports: [
        BullModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return bullConfig(configService);
            },
            inject: [ConfigService],
        }),
        BullModule.registerQueue({ name: configuration().bull.queueName }),
    ],
    providers: [CallEventHandlerService, CallProcessor, СallEventHandlerListenters],
})
export class CallEventHandlerModule {}
