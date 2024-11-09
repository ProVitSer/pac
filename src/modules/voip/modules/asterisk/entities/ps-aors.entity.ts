import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { DefaultYesNoAsterisk } from '../interfaces/asterisk.enum';

@Entity('ps_aors')
export class PsAors {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    contact: string | null;

    @Column({ nullable: true, name: 'default_expiration' })
    defaultExpiration: number | null;

    @Column({ nullable: true })
    mailboxes: string | null;

    @Column({ nullable: true, name: 'max_contacts' })
    maxContacts: number | null;

    @Column({ nullable: true, name: 'minimum_expiration' })
    minimumExpiration: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'remove_existing',
    })
    removeExisting: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'qualify_frequency' })
    qualifyFrequency: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'authenticate_qualify',
    })
    authenticateQualify: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'maximum_expiration' })
    maximumExpiration: number | null;

    @Column({ nullable: true, name: 'outbound_proxy' })
    outboundProxy: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'support_path',
    })
    supportPath: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'qualify_timeout' })
    qualifyTimeout: number | null;

    @Column({ nullable: true, name: 'voicemail_extension' })
    voicemailExtension: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'remove_unavailable',
    })
    removeUnavailable: DefaultYesNoAsterisk | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
