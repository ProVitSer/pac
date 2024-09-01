import { Column, Entity, PrimaryColumn } from 'typeorm';
import { DefaultYesNoAsterisk, Method, Protokol } from '../interfaces/asterisk.enum';

@Entity('ps_transports')
export class PsTransports {
    @PrimaryColumn({ length: 40 })
    id: string;

    @Column({ nullable: true })
    async_operations: number | null;

    @Column({ nullable: true })
    bind: string | null;

    @Column({ nullable: true })
    ca_list_file: string | null;

    @Column({ nullable: true })
    cert_file: string | null;

    @Column({ nullable: true })
    cipher: string | null;

    @Column({ nullable: true })
    domain: string | null;

    @Column({ nullable: true })
    external_media_address: string | null;

    @Column({ nullable: true })
    external_signaling_address: string | null;

    @Column({ nullable: true })
    external_signaling_port: number | null;

    @Column({
        type: 'enum',
        enum: Method,
        nullable: true,
    })
    method: Method | null;

    @Column({ nullable: true })
    local_net: string | null;

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
    })
    require_client_cert: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    verify_client: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    verify_server: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    tos: string | null;

    @Column({ nullable: true })
    cos: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_reload: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    symmetric_transport: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_wildcard_certs: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    tcp_keepalive_enable: boolean | null;

    @Column({ nullable: true })
    tcp_keepalive_idle_time: number | null;

    @Column({ nullable: true })
    tcp_keepalive_interval_time: number | null;

    @Column({ nullable: true })
    tcp_keepalive_probe_count: number | null;
}
