import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity'; // Importer l'entité User

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('timestamp')
  startTime: Date;

  @Column('timestamp')
  endTime: Date;

  @ManyToOne(() => User, (user) => user.events) 
  user: User;
}
