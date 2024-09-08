import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { DefaultYesNoAsterisk } from '../interfaces/asterisk.enum';

@Entity('ps_endpoint_id_ips')
export class PsEndpointIdIps {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    endpoint: string | null;

    @Column({ name: 'match', nullable: true })
    match: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'srv_lookups',
    })
    srvLookups: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'match_header' })
    matchHeader: string | null;

    @Column({ nullable: true, name: 'match_request_uri' })
    matchRequestUri: string | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
