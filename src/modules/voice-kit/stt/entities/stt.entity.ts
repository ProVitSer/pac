import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { STTProviderType, SttRecognizeStatus } from '../interfaces/stt.enum';

@Entity()
export class Stt {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'stt_id' })
    sttId: number;

    @Column({ unique: true, nullable: false, name: 'application_id' })
    applicationId: string;

    @Column({ nullable: true, name: 'external_stt_id' })
    externalSttId?: string;

    @Column({ nullable: true, name: 'download_voice_file_id' })
    downloadVoiceFileId?: string;

    @Column({ nullable: true, name: 'processed_voice_file_id' })
    processedVoiceFileId?: string;

    @Column({ nullable: false, type: 'enum', enum: STTProviderType, name: 'stt_provider_type' })
    sttProviderType: STTProviderType;

    @Column({ nullable: false, type: 'enum', enum: SttRecognizeStatus, name: 'stt_recognize_status' })
    sttRecognizeStatus: SttRecognizeStatus;

    @Column({ nullable: false, name: 'file_name' })
    fileName: string;

    @Column({ nullable: false, name: 'generated_file_name' })
    generatedFileName: string;

    @Column({ nullable: false, name: 'full_file_path' })
    fullFilePath: string;

    @Column('json', { nullable: true, name: 'text_dialog' })
    textDialog?: string[];

    @Column('json', { nullable: true, name: 'original_provicer_recognize' })
    originalProvicerRecognize?: any;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
