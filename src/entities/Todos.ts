import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

import {Users} from "./Users"

@Entity()
export class Todos extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @Column()
  done: boolean;

  @ManyToOne(()=>Users, users => users.todos)
  users: Users;
 
}