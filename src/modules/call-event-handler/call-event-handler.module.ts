import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { bullConfig } from '@app/common/config/bull.config';
import { CallEventHandlerService } from './services/call-event-handler.service';
import { CallProcessor } from './services/queue/call-processor.service';
import { СallEventHandlerListenters } from './listenters/call-event-handler.listenters';
import configuration from '@app/common/config/config.provider';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { AmqpModule } from '../amqp/amqp.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallEventHandler } from './entities/call-event-handler.entity';
import { IncomingCallHandlerService } from './services/handlers/incoming-call-handler.service';
import { LocalCallHandlerService } from './services/handlers/local-call-handler.service';
import { TransformedCallData } from './services/call/transformed-call-data.service';
import { OutgoingCallHandlerService } from './services/handlers/outgoing-call-handler.service';

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
        PacSqlModule,
        AmqpModule,
        TypeOrmModule.forFeature([CallEventHandler]),
    ],
    providers: [
        CallEventHandlerService,
        CallProcessor,
        СallEventHandlerListenters,
        IncomingCallHandlerService,
        LocalCallHandlerService,
        TransformedCallData,
        OutgoingCallHandlerService,
    ],
})
export class CallEventHandlerModule {}
