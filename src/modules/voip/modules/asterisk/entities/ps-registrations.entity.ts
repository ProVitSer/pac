import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { DefaultYesNoAsterisk, SecurityNegotiation } from '../interfaces/asterisk.enum';

@Entity('ps_registrations')
export class PsRegistrations {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'auth_rejection_permanent',
    })
    authRejectionPermanent: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'client_uri' })
    clientUri: string | null;

    @Column({ nullable: true, name: 'contact_user' })
    contactUser: string | null;

    @Column({ nullable: true })
    expiration: number | null;

    @Column({ nullable: true, name: 'max_retries' })
    maxRetries: number | null;

    @Column({ nullable: true, name: 'outbound_auth' })
    outboundAuth: string | null;

    @Column({ nullable: true, name: 'outbound_proxy' })
    outboundProxy: string | null;

    @Column({ nullable: true, name: 'retry_interval' })
    retryInterval: number | null;

    @Column({ nullable: true, name: 'forbidden_retry_interval' })
    forbiddenRetryInterval: number | null;

    @Column({ nullable: true, name: 'server_uri' })
    serverUri: string | null;

    @Column({ nullable: true })
    transport: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'support_path',
    })
    supportPath: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'fatal_retry_interval' })
    fatalRetryInterval: number | null;

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
        name: 'support_outbound',
    })
    supportOutbound: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'contact_header_params' })
    contactHeaderParams: string | null;

    @Column({ nullable: true })
    maxRandomInitialDelay: number | null;

    @Column({
        type: 'enum',
        enum: SecurityNegotiation,
        nullable: true,
        name: 'security_negotiation',
    })
    securityNegotiation: SecurityNegotiation | null;

    @Column({ nullable: true, name: 'security_mechanisms' })
    securityMechanisms: string | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
