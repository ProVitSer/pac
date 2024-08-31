import { Column, Entity } from 'typeorm';
import { DefaultYesNoAsterisk, SecurityNegotiation } from '../interfaces/asterisk.enum';

@Entity('ps_registrations')
export class PsRegistrations {
    @Column()
    id: string;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    auth_rejection_permanent: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    client_uri: string | null;

    @Column({ nullable: true })
    contact_user: string | null;

    @Column({ nullable: true })
    expiration: number | null;

    @Column({ nullable: true })
    max_retries: number | null;

    @Column({ nullable: true })
    outbound_auth: string | null;

    @Column({ nullable: true })
    outbound_proxy: string | null;

    @Column({ nullable: true })
    retry_interval: number | null;

    @Column({ nullable: true })
    forbidden_retry_interval: number | null;

    @Column({ nullable: true })
    server_uri: string | null;

    @Column({ nullable: true })
    transport: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    support_path: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    fatal_retry_interval: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    line: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    endpoint: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    support_outbound: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    contact_header_params: string | null;

    @Column({ nullable: true })
    maxRandomInitialDelay: number | null;

    @Column({
        type: 'enum',
        enum: SecurityNegotiation,
        nullable: true,
    })
    security_negotiation: SecurityNegotiation | null;

    @Column({ nullable: true })
    security_mechanisms: string | null;
}
