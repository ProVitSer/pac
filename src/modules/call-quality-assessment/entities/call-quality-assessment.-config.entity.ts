import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';

@Entity()
export class CallQualityAssessmentConfig {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'json', nullable: true, name: 'audio_files' })
    audioFiles: { fileId: number; cqaFileType: CqaFileType }[];

    @Column({ nullable: true, name: 'voip_trunk_id' })
    voipTrunkId: string;

    @Column({ default: false, name: 'ai_enabled' })
    aiEnabled: boolean;

    @Column({ nullable: true, name: 'client_id' })
    clientId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
