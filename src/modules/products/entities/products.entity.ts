import { Licenses } from '../../licenses/entities/licenses.entity';
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToMany } from 'typeorm';
import { ProductType } from '../interfaces/products.enum';
import { ProductInterface } from '../interfaces/products.interface';

@Entity()
export class Products implements ProductInterface {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'enum',
        enum: ProductType,
        nullable: false,
        default: ProductType.api,
        unique: true,
    })
    product_type: ProductType;

    @Column({ nullable: true })
    description?: string;

    @ManyToMany(() => Licenses, (license) => license.products)
    licenses: Licenses[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
