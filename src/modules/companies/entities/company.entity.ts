import { License } from '@app/modules/licenses/entities/license.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: false })
    contact_person_name: string;

    @Column({ nullable: false })
    contact_info: string;

    @OneToMany(() => License, (license) => license.company)
    licenses: License[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
