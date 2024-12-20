import { Licenses } from '../../licenses/entities/licenses.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, Index, OneToMany } from 'typeorm';
import { ClientInterface } from '../interfaces/client.interface';
import { Voip } from '../../../modules/voip/entities/voip.entity';
import { Users } from '../../../modules/users/entities/users.entity';
@Entity()
export class Client implements ClientInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true, type: 'integer', name: 'client_id' })
    clientId: number;

    @Column({ nullable: false, name: 'company_name' })
    companyName: string;

    @Column({ nullable: false, name: 'contact_person_name' })
    contactPersonName: string;

    @Index()
    @Column({ nullable: false, unique: true })
    phone: string;

    @Index()
    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: true, name: 'buh_id' })
    buhId?: string;

    @Column({ default: 0 })
    balance: number;

    @OneToOne(() => Licenses, (license) => license.client)
    licenses: Licenses;

    @OneToMany(() => Voip, (voip) => voip.client)
    voip: Voip[];

    @OneToOne(() => Users, (user) => user.client)
    user: Users;

    @Column({ default: false })
    deleted: boolean;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
