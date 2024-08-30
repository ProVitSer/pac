import { Exchange, RoutingKey } from '../../../common/constants/amqp';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class QueueSenderBaseService {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async sendMessage(_exchange: Exchange, _routingKey: RoutingKey, _message: { [key: string]: any }) {
        await Promise.resolve([]);
    }
}
