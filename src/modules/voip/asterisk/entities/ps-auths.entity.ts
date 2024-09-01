import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AuthType } from '../interfaces/asterisk.enum';

@Entity('ps_auths')
export class PsAuths {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: AuthType,
    })
    auth_type: AuthType;

    @Column({ nullable: true })
    nonce_lifetime: number | null;

    @Column({ nullable: true })
    md5_cred: string | null;

    @Column({ nullable: true })
    password: string | null;

    @Column({ nullable: true })
    realm: string | null;

    @Column({ nullable: true })
    username: string | null;

    @Column({ nullable: true })
    refresh_token: string | null;

    @Column({ nullable: true })
    oauth_clientid: string | null;

    @Column({ nullable: true })
    oauth_secret: string | null;
}
