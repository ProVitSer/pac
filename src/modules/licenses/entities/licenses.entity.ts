import { Product } from '../../product/entities/product.entity';
import { Client } from '../../client/entities/client.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { LicensesInterface } from '../interfaces/licenses.interface';

@Entity()
export class Licenses implements LicensesInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Client, (client) => client.licenses, { cascade: true })
    @JoinColumn()
    client: Client;

    @Column({ nullable: false, unique: true })
    license: string;

    @ManyToMany(() => Product, (product) => product.licenses, { cascade: true })
    @JoinTable()
    products: Product[];

    @Column({ nullable: false })
    expiration_date: Date;

    @Column({ default: false })
    is_active: boolean;

    @Column({ default: true })
    is_test: boolean;

    @Column({ nullable: true })
    order?: Date;

    @Column({ nullable: true })
    activate?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
