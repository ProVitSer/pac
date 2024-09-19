import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { CallResult } from '../interfaces/call-quality-assessment.enum';
import { CallQualityAssessmentConfig } from './call-quality-assessment.-config.entity';

@Entity()
export class CallQualityAssessmentStatistic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, default: 0 })
    rating: number;

    @Column({ nullable: false, name: 'client_number' })
    clientNumber: string;

    @Column({ nullable: true, name: 'number_region' })
    numberRegion: string;

    @Column({ nullable: true, name: 'manager_data' })
    managerData: string;

    @Column({ nullable: true, name: 'manager_number' })
    managerNumber: string;

    @Column({ nullable: false, unique: true })
    uniqueid: string;

    @Column({ nullable: true, unique: true })
    externalCallId: string;

    @Column({ nullable: false, type: 'enum', enum: CallResult, name: 'call_result', default: CallResult.unknown })
    callResult: CallResult;

    @ManyToOne(() => CallQualityAssessmentConfig, (cqac) => cqac.callQualityAssessmentStatistic)
    @JoinColumn({ name: 'cqac_id' })
    callQualityAssessmentConfig: CallQualityAssessmentConfig;

    @ManyToOne(() => Client, (client) => client.callQualityAssessmentStatistic)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
