import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../roles/roles.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @DeleteDateColumn()
  deleteAt: Date;

  @Column({ name: 'rolesId' })
  roles_id: number;

  @ManyToOne(() => Roles)
  roles: Roles[];
}
