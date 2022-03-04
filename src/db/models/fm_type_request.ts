<<<<<<< HEAD
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_request from './fm_request';

@Entity()
export default class fm_type_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_type_request)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
=======
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_request from './fm_request';

@Entity()
export default class fm_type_request {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request.id_type_request)
	@JoinColumn({ name: 'requests' })
	requests?: fm_request[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
