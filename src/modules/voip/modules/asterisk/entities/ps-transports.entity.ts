import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { DefaultYesNoAsterisk, Method, Protokol } from '../interfaces/asterisk.enum';

@Entity('ps_transports')
export class PsTransports {
    @PrimaryColumn({ length: 40 })
    id: string;

    @Column({ nullable: true, name: 'async_operations' })
    asyncOperations: number | null;

    @Column({ nullable: true })
    bind: string | null;

    @Column({ nullable: true, name: 'ca_list_file' })
    caListFile: string | null;

    @Column({ nullable: true, name: 'cert_file' })
    certFile: string | null;

    @Column({ nullable: true })
    cipher: string | null;

    @Column({ nullable: true })
    domain: string | null;

    @Column({ nullable: true, name: 'external_media_address' })
    externalMediaAddress: string | null;

    @Column({ nullable: true, name: 'external_signaling_address' })
    externalSignalingAddress: string | null;

    @Column({ nullable: true, name: 'external_signaling_port' })
    externalSignalingPort: number | null;

    @Column({
        type: 'enum',
        enum: Method,
        nullable: true,
    })
    method: Method | null;

    @Column({ nullable: true, name: 'local_net' })
    localNet: string | null;

    @Column({ nullable: true })
    password: string | null;

    @Column({ nullable: true })
    privKeyFile: string | null;

    @Column({
        type: 'enum',
        enum: Protokol,
        nullable: true,
    })
    protocol: Protokol | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'require_client_cert',
    })
    requireClientCert: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'verify_client',
    })
    verifyClient: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'verify_server',
    })
    verifyServer: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    tos: string | null;

    @Column({ nullable: true })
    cos: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_reload',
    })
    allowReload: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'symmetric_transport',
    })
    symmetricTransport: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_wildcard_certs',
    })
    allowWildcardCerts: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'tcp_keepalive_enable' })
    tcpKeepaliveEnable: boolean | null;

    @Column({ nullable: true, name: 'tcp_keepalive_idle_time' })
    tcpKeepaliveIdleTime: number | null;

    @Column({ nullable: true, name: 'tcp_keepalive_interval_time' })
    tcpKeepaliveIntervalTime: number | null;

    @Column({ nullable: true, name: 'tcp_keepalive_probe_count' })
    tcpKeepaliveProbeCount: number | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
