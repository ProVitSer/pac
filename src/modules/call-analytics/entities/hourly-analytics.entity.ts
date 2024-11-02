import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hourly_analitics')
export class HourlyAnalitics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', name: 'report_date' })
    reportDate: string;

    @Column({ type: 'int', name: 'report_hour' })
    reportHour: number;

    @Column('int', { name: 'call_ids', array: true })
    callIds: number[];

    @Column('json')
    data: {
        local: {
            totalCalls: number;
            extensions: Record<string, { callCount: number; totalTalkingDuration: number }>;
        };
        incoming: {
            totalCalls: number;
            cities: Record<string, number>;
            regions: Record<string, number>;
            totalDuration: number;
            totalRingingDuration: number;
            totalAnsweredCalls: number;
            totalUnansweredCalls: number;
            callsById: Record<string, { answered: boolean; talkingDuration: number; ringingDuration: number }>;
        };
        outgoing: {
            totalCalls: number;
            cities: Record<string, number>;
            regions: Record<string, number>;
            totalDuration: number;
            totalRingingDuration: number;
            totalAnsweredCalls: number;
            totalUnansweredCalls: number;
            callsById: Record<string, { answered: boolean; talkingDuration: number; ringingDuration: number }>;
        };
    };

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
