// create table with id primary key and name string in typeorm
import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	OneToOne,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
} from 'typeorm';

@Entity()
export default class fm_type_diferido {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
