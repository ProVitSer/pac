import { Column, Entity } from 'typeorm';
import { DefaultYesNoAsterisk } from '../interfaces/asterisk.enum';

@Entity('ps_aors')
export class PsAors {
    @Column()
    id: string;

    @Column({ nullable: true })
    contact: string | null;

    @Column({ nullable: true })
    default_expiration: number | null;

    @Column({ nullable: true })
    mailboxes: string | null;

    @Column({ nullable: true })
    max_contacts: number | null;

    @Column({ nullable: true })
    minimum_expiration: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    remove_existing: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    qualify_frequency: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    authenticate_qualify: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    maximum_expiration: number | null;

    @Column({ nullable: true })
    outbound_proxy: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    support_path: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, precision: 53 })
    qualify_timeout: number | null;

    @Column({ nullable: true })
    voicemail_extension: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    remove_unavailable: DefaultYesNoAsterisk | null;
}
