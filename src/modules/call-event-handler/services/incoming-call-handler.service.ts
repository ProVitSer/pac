import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../entities/call-event-handler.entity';
import { CallRingingData, FullCallInfo } from '../interfaces/call-event-handler.interface';
import { FULL_INCOMING_CALL_INFO } from '@app/common/constants/sql';
import { ConfigService } from '@nestjs/config';
import { PbxEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import { format, parse } from 'date-fns';
import { DateTime } from 'luxon';

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
        const fullCallInfo = await this.getFullCallInfo(callRingiingData, callId);

        console.log(fullCallInfo);
    }

    // private async checkCallInfo(callRingiingData: CallOnProcessEvent, callId: number): Promise<void> {
    // await this.getFullCallInfo(callRingiingData, callId);
    // await this.amqpService.sendMessage(Exchange.events, RoutingKey.callMissed, {
    //     clientId: callRingiingData.client.clientId,
    //     trunkName: '',
    //     externalNumber: '',
    // });
    // }

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
