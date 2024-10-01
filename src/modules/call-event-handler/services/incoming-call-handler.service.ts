import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../entities/call-event-handler.entity';
import { CallOnProcessEvent, CallRingingData, FullCallInfo } from '../interfaces/call-event-handler.interface';
import { FULL_INCOMING_CALL_INFO } from '@app/common/constants/sql';
import { ConfigService } from '@nestjs/config';
import { PbxEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import { format, parse } from 'date-fns';
import { DateTime } from 'luxon';
import { Exchange, RoutingKey } from '@app/common/constants/amqp';

@Injectable()
export class IncomingCallHandlerService {
    constructor(
        private readonly configService: ConfigService,
        private readonly pacSqlService: PacSqlService,
        private readonly amqpService: AmqpService,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
    ) {}

    public async handleOutbound(callRingiingData: CallRingingData, callId: number): Promise<void> {
        try {
            const fullCallInfo = await this.getFullCallInfo(callRingiingData, callId);

            await this.checkCallInfo(callRingiingData, fullCallInfo, callId);
        } catch (e) {
            return;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private async checkCallInfo(callRingiingData: CallOnProcessEvent, fullCallInfo: FullCallInfo[], callId: number): Promise<void> {
        const sortedFullCallInfo = fullCallInfo.sort((a, b) => Number(a.segmentId) - Number(b.segmentId));

        await this.addCallData(callRingiingData, fullCallInfo);

        //Проверить первый объект и отправить, если callAnswered равно false, неотвеченный входящий
        if (sortedFullCallInfo.length > 0 && !sortedFullCallInfo[0].callAnswered) {
            const { operatorName, srcCallerNnumber } = sortedFullCallInfo[0];
            this.sendMissedCall(callRingiingData.client.clientId, operatorName, srcCallerNnumber);
        }
    }

    private async sendCallToStatistic(): Promise<void> {}
    private async sendCallToCrm(): Promise<void> {}

    private async addCallData(callRingiingData: CallOnProcessEvent, fullCallInfo: FullCallInfo[]): Promise<void> {
        await this.callEventHandlerRepository.update({ callHistoryId: callRingiingData.callHistoryId }, { fullCallInfo });
    }

    private async sendMissedCall(clientId: number, trunkName: string, externalNumber: string): Promise<void> {
        await this.amqpService.sendMessage(Exchange.events, RoutingKey.callMissed, {
            clientId,
            trunkName,
            externalNumber,
        });
    }

    private async getFullCallInfo(callRingiingData: CallRingingData, callId: number) {
        const fullCallInfo = await this.pacSqlService.sqlRequest(callRingiingData.client, {
            query: `${FULL_INCOMING_CALL_INFO} ${callId}`,
        });

        const parseResult = JSON.parse(fullCallInfo.result);

        return parseResult.length > 0 ? await this.transformedData(parseResult) : undefined;
    }

    private async transformedData(callData: string[]): Promise<FullCallInfo[]> {
        const pbxConf = this.configService.get('pbx') as PbxEnvironmentVariables;
        const transformedData = callData.map((row) => ({
            segmentId: row[0],
            srcId: row[1],
            startTime: format(parse(row[2].replace(/AM|PM/g, '').trim(), 'M/d/yyyy h:mm:ss', new Date()), 'dd-MM-yyyy HH:mm:ss'),
            endTime: format(parse(row[3].replace(/AM|PM/g, '').trim(), 'M/d/yyyy h:mm:ss', new Date()), 'dd-MM-yyyy HH:mm:ss'),
            srcDisplayName: row[4],
            srcCallerNnumber: row[5],
            srcDn: row[6],
            dstExtendedDisplayName: row[7],
            dstDisplayName: row[8],
            dstDn: row[9],
            dstCallerNumber: row[10],
            dstParticipantId: row[11],
            callTime: Math.round(new Date(`1970-01-01T${row[12]}Z`).getTime() / 1000) | 0,
            dstRecordingUrl: row[14] ? `${pbxConf.recordingPath}${row[14]}` : null,
            srcRecordingUrl: row[13] || null,
            operatorName: row[15] || null,
            isDstInUsers: row[16] === 'True',
            callAnswered: row[17] === 'True',
        }));

        return transformedData;
    }
}
