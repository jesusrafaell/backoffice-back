import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
//import fm_posXcommerce from './fm_posXcommerce';

@Entity()
export default class fm_status_pos {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	/*
	@ManyToMany(() => fm_posXcommerce)
	@JoinTable()
	posXcomercio?: fm_posXcommerce[];
	*/

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
