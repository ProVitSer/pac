import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Client } from '../../../modules/client/entities/client.entity';

@Entity()
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    file_name: string;

    @Column({ nullable: false })
    generated_file_name: string;

    @Column({ nullable: false })
    generated_file_path: string;

    @Column({ nullable: false })
    path: string;

    @Column({ nullable: false })
    mimetype: string;

    @Column({ nullable: true })
    size?: number;

    @Column({ nullable: true })
    description?: string;

    // @Column({ nullable: false, type: 'enum', enum: FileType })
    // file_type: FileType;

    @Column({ nullable: false })
    file_type: string;

    @ManyToOne(() => Client, (client) => client.files, { onDelete: 'CASCADE' })
    client: Client;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
