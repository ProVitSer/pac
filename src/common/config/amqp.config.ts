import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';
import { AmqpEnvironmentVariables } from './interfaces/config.interface';

export const getRabbitMQConfig = async (configService: ConfigService): Promise<RabbitMQConfig> => {
    const amqpConfig = configService.get('amqp') as AmqpEnvironmentVariables;

    return {
        uri: `amqp://${amqpConfig.username}:${amqpConfig.password}@${amqpConfig.hostname}:${amqpConfig.port}${amqpConfig.vhost}`,
        prefetchCount: 15,
        connectionInitOptions: { wait: false },
        enableControllerDiscovery: true,
    };
};
