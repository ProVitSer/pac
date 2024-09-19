import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CallQualityAssessmentStatistic } from './call-quality-assessment-statistic.entity';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';

@Entity()
export class CallQualityAssessmentConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json', nullable: true, name: 'audio_files' })
    audioFiles: { fileId: number; cqaFileType: CqaFileType }[];

    @Column({ nullable: true, name: 'voip_trunk_id' })
    voipTrunkId: string;

    @Column({ nullable: true, name: 'client_id' })
    clientId: number;

    @OneToMany(() => CallQualityAssessmentStatistic, (cqas) => cqas.callQualityAssessmentConfig)
    callQualityAssessmentStatistic: CallQualityAssessmentStatistic[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
