import { License } from '../../licenses/entities/license.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    client_id: string;

    @Column({ nullable: false })
    company_name: number;

    @Column({ nullable: false })
    contact_person_name: string;

    @Column({ nullable: false })
    phone: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    buh_id?: string;

    @Column({ default: 0 })
    balance: number;

    @OneToMany(() => License, (license) => license.company)
    licenses: License[];

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
