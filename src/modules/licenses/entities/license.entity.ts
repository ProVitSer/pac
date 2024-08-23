import { Product } from '@app/modules/product/entities/product.entity';
import { Client } from '../../client/entities/client.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { LicensesInterface } from '../interfaces/licenses.interface';

@Entity()
export class License implements LicensesInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client, (client) => client.licenses, { cascade: true })
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToMany(() => Product, (product) => product.licenses)
    products: Product[];

    @Column({ nullable: false })
    expiration_date: Date;

    @Column({ default: true })
    is_active: boolean;

    @Column({ default: true })
    is_test: boolean;

    @Column({ type: 'bigint' })
    client_id: number;

    @Column({ nullable: true })
    order: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
