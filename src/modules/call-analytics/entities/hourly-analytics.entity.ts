import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { HourlyAnalicsData } from '../interfaces/call-analytics.interface';

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
    data: HourlyAnalicsData;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
