import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DailyAnalicsData } from '../interfaces/call-analytics.interface';

@Entity('daily_analitics')
export class DailyAnalitics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date', name: 'report_date' })
    reportDate: string;

    @Column('json')
    data: DailyAnalicsData;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
