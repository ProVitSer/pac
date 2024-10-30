import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CallResult } from '../interfaces/call-quality-assessment.enum';
@Entity()
export class CallQualityAssessmentStatistic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, default: 0 })
    rating: number;

    @Column({ nullable: true, name: 'client_company' })
    clientCompany?: string;

    @Column({ nullable: true, name: 'client_name' })
    clientName?: string;

    @Column({ nullable: true, name: 'client_number' })
    clientNumber?: string;

    @Column({ nullable: true, name: 'country' })
    country?: string;

    @Column({ nullable: true, name: 'region' })
    region?: string;

    @Column({ nullable: true, name: 'city' })
    city?: string;

    @Column({ nullable: true, name: 'manager_data' })
    managerData?: string;

    @Column({ nullable: true, name: 'manager_number' })
    managerNumber?: string;

    @Column({ nullable: false, unique: true })
    uniqueid: string;

    @Column({ nullable: true, unique: true })
    externalCallId: string;

    @Column({ nullable: false, type: 'enum', enum: CallResult, name: 'call_result', default: CallResult.unknown })
    callResult: CallResult;

    @Column({ name: 'client_id' })
    clientId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
