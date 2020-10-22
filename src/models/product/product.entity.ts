import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cost_price: number;

    @Column()
    sale_price: number;

    @Column()
    createdAt: Date;
}
