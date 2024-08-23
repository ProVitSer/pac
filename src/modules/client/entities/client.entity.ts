import { License } from '../../licenses/entities/license.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';

@Entity()
export class Client {
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
    buh_id?: string;

    @Column({ default: 0 })
    balance: number;

    @OneToOne(() => License, (license) => license.company)
    licenses: License;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
