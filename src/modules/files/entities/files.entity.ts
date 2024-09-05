import { Voip } from '@app/modules/voip/entities/voip.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FileType } from '../interfaces/files.enum';
import { Client } from '@app/modules/client/entities/client.entity';

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    filename: string;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    mimetype: string;

    @Column({ nullable: true })
    size?: number;

    @Column({ nullable: true })
    description?: string;

    @Column({ nullable: false, type: 'enum', enum: FileType })
    file_type: FileType;

    @ManyToOne(() => Voip, (voip) => voip.files)
    voip: Voip;

    @ManyToOne(() => Client, (client) => client.files, { onDelete: 'CASCADE' })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
