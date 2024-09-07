import { Licenses } from '../../licenses/entities/licenses.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Index, OneToMany } from 'typeorm';
import { ClientInterface } from '../interfaces/client.interface';
import { Voip } from '../../../modules/voip/entities/voip.entity';
import { Files } from '../../../modules/files/entities/files.entity';
import { Users } from '../../../modules/users/entities/users.entity';

@Entity()
export class Client implements ClientInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, type: 'integer' })
    client_id: number;

    @Column({ nullable: false })
    company_name: string;

    @Column({ nullable: false })
    contact_person_name: string;

    @Index()
    @Column({ nullable: false, unique: true })
    phone: string;

    @Index()
    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true })
    buh_id?: string;

    @Column({ default: 0 })
    balance: number;

    @OneToOne(() => Licenses, (license) => license.client)
    licenses: Licenses;

    @OneToMany(() => Voip, (voip) => voip.client)
    voip: Voip[];

    @OneToMany(() => Files, (file) => file.client)
    files: Files[];

    @OneToOne(() => Users, (user) => user.client)
    user: Users;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
