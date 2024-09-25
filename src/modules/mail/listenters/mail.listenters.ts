import { Injectable } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Contexts, SendMailData } from '../interfaces/mail.interface';

@Injectable()
export class MailListenters {
    constructor(private readonly mailService: MailService) {}

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.mail,
        routingKey: RoutingKey.sendMail,
    })
    public async mailTaskSubHandler(msg: SendMailData<Contexts>): Promise<void | Nack> {
        try {
            await this.mailService.sendMail(msg);
        } catch (e) {
            return;
        }
    }
}
