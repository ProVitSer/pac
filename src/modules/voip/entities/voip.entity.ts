import { Client } from '../../client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinTable, ManyToOne } from 'typeorm';
import { VoipInterface } from '../interfaces/voip.interface';
import { TrunkType } from '../interfaces/voip.enum';

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
