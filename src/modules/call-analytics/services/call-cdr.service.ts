import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PbxCallStatistics } from '../entities/pbx-call-statistics.entity';
import { CdrData, GetCdrQuery, GetCdrResult } from '../interfaces/call-analytics.interface';
import { format, parseISO } from 'date-fns';

@Injectable()
export class CallCdrService {
    constructor(
        @InjectRepository(PbxCallStatistics)
        private pbxCallStatisticsRepository: Repository<PbxCallStatistics>,
    ) {}

    public async getCdr(query: GetCdrQuery): Promise<GetCdrResult> {
        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const searchDate = query.dateString || null; //format(new Date(), 'yyyy-MM-dd');

        const date = new Date(query.dateString);

        const startOfDay = new Date(date);

        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);

        endOfDay.setHours(23, 59, 59, 999);

        const queryBuilder = this.pbxCallStatisticsRepository
            .createQueryBuilder('pbx_call_statistics')
            .orderBy('pbx_call_statistics.call_id', 'DESC');

        if (searchDate) {
            queryBuilder.where('pbx_call_statistics.start_time BETWEEN :startOfDay AND :endOfDay', {
                startOfDay,
                endOfDay,
            });
        }

        if (query.phoneNumber) {
            queryBuilder.where('pbx_call_statistics.destination_caller_id LIKE :phoneNumber', { phoneNumber: `%${query.phoneNumber}%` });
            queryBuilder.where('pbx_call_statistics.source_caller_id LIKE :phoneNumber', { phoneNumber: `%${query.phoneNumber}%` });
        }

        const totalRecords = await queryBuilder.getCount();

        const cdrs = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const formattedCdrs: CdrData[] = [];

        cdrs.map((cdr: PbxCallStatistics) =>
            formattedCdrs.push({
                callDate: format(parseISO(cdr.startTime), 'dd.MM.yyyy HH:mm:ss'),
                callId: cdr.callId,
                sourceDisplayName: cdr.sourceDisplayName,
                destinationDisplayName: cdr.destinationDisplayName,
                answered: cdr.answered,
                ringingDuration: cdr.ringingDuration.split('.')[0],
                talkingDuration: cdr.talkingDuration.split('.')[0],
                reason: cdr.reason,
                recordingUrl: cdr.recordingUrl,
                date: format(parseISO(cdr.startTime), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: formattedCdrs,
            totalRecords: totalRecords || 0,
        };
    }
}
