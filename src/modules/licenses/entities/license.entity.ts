import { Client } from '../../client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class License {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client, (client) => client.licenses, { onDelete: 'CASCADE' })
    @JoinColumn()
    company: Client;

    @Column()
    type: string;

    @Column({ nullable: true })
    expiration_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
