import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { DocumentType } from '../document-type/document-type.entity';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  tradename: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ name: 'documentTypeId' })
  document_id: number;

  @Column({ name: 'cityId' })
  city_id: number;

  @ManyToOne(() => DocumentType)
  documentType: DocumentType[];

  @ManyToOne(() => CiudadEntity)
  city: CiudadEntity[];
}
