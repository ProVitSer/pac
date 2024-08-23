import { License } from '../../licenses/entities/license.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { ClientInterface } from '../interfaces/client.interface';

@Entity()
export class Client implements ClientInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, type: 'bigint' })
    client_id: number;

    @Column({ nullable: false })
    company_name: string;

    @Column({ nullable: false })
    contact_person_name: string;

    @Column({ nullable: false, unique: true })
    phone: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    buh_id: string;

    @Column({ default: 0 })
    balance: number;

    @OneToOne(() => License, (license) => license.client_id)
    licenses: License;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
