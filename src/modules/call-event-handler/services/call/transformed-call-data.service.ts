import configuration from '@app/common/config/config.provider';
import { CallRingingData, FullCallInfo } from '../../interfaces/call-event-handler.interface';
import { format, parse } from 'date-fns';
import { Injectable } from '@nestjs/common';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';

@Injectable()
export class TransformedCallData {
    constructor(private readonly pacSqlService: PacSqlService) {}

    public async getFullCallInfo(callRingiingData: CallRingingData, callId: number, query: string) {
        const fullCallInfo = await this.pacSqlService.sqlRequest(callRingiingData.clientId, {
            query: `${query} ${callId}`,
        });

        const parseResult = JSON.parse(fullCallInfo.result);

        return parseResult.length > 0 ? await this.transformed(parseResult) : undefined;
    }
    private async transformed(callData: string[]): Promise<FullCallInfo[]> {
        const pbxConf = configuration().pbx;

        const transformedData = callData.map((row) => ({
            segmentId: row[0],
            srcId: row[1],
            startTime: format(parse(row[2].replace(/AM|PM/g, '').trim(), 'M/d/yyyy h:mm:ss', new Date()), 'yyyy-MM-dd hh:mm:ss'),
            endTime: format(parse(row[3].replace(/AM|PM/g, '').trim(), 'M/d/yyyy h:mm:ss', new Date()), 'yyyy-MM-dd hh:mm:ss'),
            srcDisplayName: row[4],
            srcCallerNumber: row[5],
            srcDn: row[6],
            dstExtendedDisplayName: row[7],
            dstDisplayName: row[8],
            dstDn: row[9],
            dstCallerNumber: row[10],
            dstParticipantId: row[11],
            callTime: Math.round(new Date(`1970-01-01T${row[12]}Z`).getTime() / 1000) | 0,
            dstRecordingUrl: row[14] ? `${pbxConf.recordingPath}/${row[14]}` : null,
            srcRecordingUrl: row[13] || null,
            operatorName: row[15] || null,
            isDstInUsers: row[16] === 'True',
            callAnswered: row[17] === 'True',
        }));

        return transformedData;
    }
}
