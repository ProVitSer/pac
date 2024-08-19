import { Company } from '../../../modules/companies/entities/company.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class License {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Company, (company) => company.licenses, { onDelete: 'CASCADE' })
    company: Company;

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
