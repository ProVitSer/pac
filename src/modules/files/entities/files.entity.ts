import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../../modules/client/entities/client.entity';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'file_name' })
    fileName: string;

    @Column({ nullable: false, name: 'generated_file_name' })
    generatedFileName: string;

    @Column({ nullable: false, name: 'generated_file_path' })
    generatedFilePath: string;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    mimetype: string;

    @Column({ nullable: true })
    size?: number;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: false, type: 'enum', enum: ApplicationServiceType, name: 'application_service_type' })
    applicationServiceType: ApplicationServiceType;

    @ManyToOne(() => Client, (client) => client.files, { onDelete: 'CASCADE' })
    client: Client;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
