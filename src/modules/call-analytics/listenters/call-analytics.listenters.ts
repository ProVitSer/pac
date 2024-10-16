import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CallAnaliticsData } from '../interfaces/call-analytics.interface';
import { CallAnaliticsService } from '../services/call-analitics.service';
import { DadataApiService } from '@app/modules/dadata-api/services/dadata-api.service';
import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { FullCallInfo } from '@app/modules/call-event-handler/interfaces/call-event-handler.interface';
import { DadataTypes, SuggestionsStatus } from '@app/modules/dadata-api/interfaces/dadata-api.enum';
import { DaDataPhoneObj } from '@app/modules/dadata-api/interfaces/dadata-api.interface';

@Injectable()
export class CallAnaliticsListenters {
    constructor(
        private readonly callAnaliticsService: CallAnaliticsService,
        private readonly dadataApiService: DadataApiService,
    ) {}

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callAnalitics,
    })
    public async callAnaliticsSubHandler(msg: CallAnaliticsData): Promise<void | Nack> {
        switch (msg.callDireciton) {
            case CallDirection.incoming:
                return await this.incominCall(msg);
            case CallDirection.outgoing:
                return await this.outgoingCall(msg);
            case CallDirection.local:
                return await this.localCall(msg);
            default:
                return;
        }
    }
    private async incominCall(msg: CallAnaliticsData): Promise<void> {
        const phosneData = await this.getPhoneData(msg.fullCallInfo[0].srcCallerNumber);

        await Promise.all(
            msg.fullCallInfo.map(async (c: FullCallInfo) => {
                await this.callAnaliticsService.addCall({
                    ...c,
                    callId: msg.callId,
                    clientId: msg.clientId,
                    callDirection: msg.callDireciton,
                    region: phosneData.region || '',
                    city: phosneData.city || '',
                    country: phosneData.country || '',
                });
            }),
        );
    }

    private async outgoingCall(msg: CallAnaliticsData): Promise<void> {
        const phosneData = await this.getPhoneData(msg.fullCallInfo[0].dstCallerNumber);

        await Promise.all(
            msg.fullCallInfo.map(async (c: FullCallInfo) => {
                await this.callAnaliticsService.addCall({
                    ...c,
                    callId: msg.callId,
                    clientId: msg.clientId,
                    callDirection: msg.callDireciton,
                    region: phosneData.region || '',
                    city: phosneData.city || '',
                    country: phosneData.country || '',
                });
            }),
        );
    }

    private async localCall(msg: CallAnaliticsData): Promise<void> {
        await Promise.all(
            msg.fullCallInfo.map(async (c: FullCallInfo) => {
                await this.callAnaliticsService.addCall({
                    ...c,
                    callId: msg.callId,
                    clientId: msg.clientId,
                    callDirection: msg.callDireciton,
                });
            }),
        );
    }

    private async getPhoneData(clientNumber: string): Promise<DaDataPhoneObj | undefined> {
        try {
            const dadataData = {
                type: DadataTypes.PHONE,
                suggestions: SuggestionsStatus.NO,
                query: clientNumber,
            };
            const phoneData = await this.dadataApiService.getDadataInfo<DaDataPhoneObj[]>(dadataData);

            return phoneData.length > 0 ? phoneData[0] : undefined;
        } catch (e) {
            return;
        }
    }
}
