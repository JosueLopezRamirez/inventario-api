import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductType } from '../product-type/product-type.entity';
import { Provider } from '../provider/provider.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  stock: number;

  @Column({ name: 'typeId' })
  type_id: number;

  @Column({ name: 'providerId' })
  provider_id: number;

  @Column()
  cost_price: number;

  @Column()
  sale_price: number;

  @Column({ type: 'date' })
  createdAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(
    () => ProductType,
    type => type.product,
  )
  type: ProductType[];

  @ManyToOne(() => Provider)
  provider: Provider[];
}
