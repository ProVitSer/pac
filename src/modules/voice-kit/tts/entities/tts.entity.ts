import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { TTSProviderType } from '../interfaces/tts.enum';

@Entity()
export class Tts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'tts_id' })
    ttsId: number;

    @Column({ nullable: false, type: 'enum', enum: TTSProviderType, name: 'tts_provider_type' })
    ttsProviderType: TTSProviderType;

    @Column({ nullable: false, name: 'file_name' })
    fileName: string;

    @Column({ nullable: false, name: 'generated_file_name' })
    generatedFileName: string;

    @Column({ nullable: false, name: 'full_file_path' })
    fullFilePath: string;

    @Column()
    text: string;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
