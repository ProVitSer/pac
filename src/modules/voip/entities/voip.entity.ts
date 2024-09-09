import { Client } from '../../client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne } from 'typeorm';
import { VoipInterface } from '../interfaces/voip.interface';
import { TrunkRegistryStatus } from '../interfaces/voip.enum';
import { ApplicationServiceType } from '../../../common/interfaces/enums';

@Entity()
export class Voip implements VoipInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.licenses, { cascade: true })
    @JoinTable()
    client: Client;

    @Column({ nullable: false, unique: true, name: 'trunk_id' })
    trunkId: string;

    @Column({
        type: 'enum',
        enum: ApplicationServiceType,
        nullable: false,
        name: 'application_service_type',
    })
    applicationServiceType: ApplicationServiceType;

    @Column({
        type: 'enum',
        enum: TrunkRegistryStatus,
        nullable: false,
        default: TrunkRegistryStatus.Unregistered,
        name: 'trunk_status',
    })
    trunkStatus: TrunkRegistryStatus;

    @Column()
    active: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
