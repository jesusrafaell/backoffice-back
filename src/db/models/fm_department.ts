<<<<<<< HEAD
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_status from './fm_status';

@Entity()
export default class fm_department {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_status, (fm_status) => fm_status.id_department)
	@JoinColumn({ name: 'status' })
	status?: fm_status[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
=======
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_status from './fm_status';

@Entity()
export default class fm_department {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_status, (fm_status) => fm_status.id_department)
	@JoinColumn({ name: 'status' })
	status?: fm_status[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
