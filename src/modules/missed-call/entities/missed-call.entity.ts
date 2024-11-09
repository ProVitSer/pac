import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { MissedServiceType } from '../interfaces/missed-call.enum';

@Entity()
export class MissedCall {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, name: 'trunk_name' })
    trunkName: string;

    @Column({ type: 'enum', enum: MissedServiceType, nullable: true, name: 'missed_service_type', array: true })
    missedServiceType: MissedServiceType[];

    @Column({ nullable: true, name: 'client_id' })
    clientId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
