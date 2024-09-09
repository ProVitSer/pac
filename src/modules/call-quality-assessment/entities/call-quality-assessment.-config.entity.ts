import { Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { CallQualityAssessmentStatistic } from './call-quality-assessment.-statistic.entity';

@Entity()
export class CallQualityAssessmentConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'simple-array', nullable: true, name: 'audio_files' })
    audioFiles: number[];

    @Column({ nullable: true, name: 'voi_trunk_id' })
    voipTrunkId: number;

    @OneToOne(() => Client, (client) => client.callQualityAssessmentConfig, { onDelete: 'CASCADE' })
    client: Client;

    @OneToMany(() => CallQualityAssessmentStatistic, (cqas) => cqas.callQualityAssessmentConfig)
    callQualityAssessmentStatistic: CallQualityAssessmentStatistic[];

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
