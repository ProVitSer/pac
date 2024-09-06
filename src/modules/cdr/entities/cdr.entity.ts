import { TrunkType } from '../../../modules/voip/interfaces/voip.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cdr {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    calldate: Date;

    @Column({ nullable: false })
    clid: string;

    @Column({ nullable: false })
    src: string;

    @Column({ nullable: false })
    dst: string;

    @Column({ nullable: false })
    dcontext: string;

    @Column({ nullable: false })
    channel: string;

    @Column({ nullable: false })
    dstchannel: string;

    @Column({ nullable: true })
    lastapp?: string;

    @Column({ nullable: true })
    lastdata?: string;

    @Column({ nullable: true })
    duration?: number;

    @Column({ nullable: false })
    billsec: number;

    @Column({ nullable: false })
    disposition: string;

    @Column({ nullable: true })
    amaflags?: number;

    @Column({ nullable: false })
    accountcode: string;

    @Column({ nullable: false, unique: true })
    uniqueid: string;

    @Column({ nullable: false })
    linkedid: string;

    @Column({ nullable: true })
    userfield?: string;

    @Column({ nullable: false })
    client_id: string;

    @Column({ nullable: false })
    trunk_type: TrunkType;
}
