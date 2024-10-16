import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { AuthType } from '../interfaces/asterisk.enum';

@Entity('ps_auths')
export class PsAuths {
    @PrimaryColumn()
    id: string;

    @Column({
        type: 'enum',
        enum: AuthType,
        name: 'auth_type',
    })
    authType: AuthType;

    @Column({ nullable: true, name: 'nonce_lifetime' })
    nonceLifetime: number | null;

    @Column({ nullable: true, name: 'md5_cred' })
    md5Cred: string | null;

    @Column({ nullable: true })
    password: string | null;

    @Column({ nullable: true })
    realm: string | null;

    @Column({ nullable: true })
    username: string | null;

    @Column({ nullable: true, name: 'refresh_token' })
    refreshToken: string | null;

    @Column({ nullable: true, name: 'oauth_clientid' })
    oauthClientid: string | null;

    @Column({ nullable: true, name: 'oauth_secret' })
    oauthSecret: string | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
