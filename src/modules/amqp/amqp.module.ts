import { Module } from '@nestjs/common';
import { AmqpService } from './services/amqp.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQConfig } from '@app/common/config/amqp.config';

@Module({
    imports: [
        ConfigModule,
        RabbitMQModule.forRootAsync(RabbitMQModule, {
            imports: [ConfigModule],
            useFactory: getRabbitMQConfig,
            inject: [ConfigService],
        }),
    ],
    providers: [AmqpService],
    exports: [AmqpService],
})
export class AmqpModule {}
