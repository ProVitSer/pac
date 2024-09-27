import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { RoutingServiceType } from '../interfaces/smart-routing.enum';

@Entity()
export class SmartRouting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, name: 'name' })
    name: string;

    @Column({ nullable: false, name: 'pbx_extension', unique: true })
    pbxExtension: string;

    @Column({
        type: 'enum',
        enum: RoutingServiceType,
        nullable: false,
        name: 'routing_service',
    })
    routingService: RoutingServiceType;

    @Column({ name: 'client_id' })
    clientId: number;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
