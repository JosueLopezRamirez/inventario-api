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
  export class Client {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;

    @Column()
    lastname: string;
  
    @Column({ name: 'ciudadId' })
    city_id: number;
  
    @Column({ name: 'documentTypeId' })
    document_type_id: number;
  
    @Column({ type: 'date' })
    createdAt: Date;
  
    @DeleteDateColumn()
    deleteAt: Date;
  
    @ManyToOne(
      () => CiudadEntity
    )
    ciudad: CiudadEntity[];
  
    @ManyToOne(() => DocumentType)
    documentType: DocumentType[];
  }
  