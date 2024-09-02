import { Column, Entity, PrimaryColumn } from 'typeorm';
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
    })
    srv_lookups: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    match_header: string | null;

    @Column({ nullable: true })
    match_request_uri: string | null;
}
