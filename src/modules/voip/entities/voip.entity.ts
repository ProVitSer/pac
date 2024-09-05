import { Client } from '../../client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne, OneToMany } from 'typeorm';
import { VoipInterface } from '../interfaces/voip.interface';
import { TrunkType } from '../interfaces/voip.enum';
import { Files } from '../../../modules/files/entities/files.entity';

@Entity()
export class Voip implements VoipInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Client, (client) => client.licenses, { cascade: true })
    @JoinTable()
    client: Client;

    @Column({ nullable: false, unique: true })
    trunk_id: string;

    @Column({
        type: 'enum',
        enum: TrunkType,
        nullable: false,
    })
    trunk_type: TrunkType;

    @Column()
    active: boolean;

    @OneToMany(() => Files, (file) => file.voip, { cascade: true })
    files: Files[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
