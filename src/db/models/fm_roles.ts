<<<<<<< HEAD
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_worker from './fm_worker';
import fm_client from './fm_client';

@Entity()
export default class fm_roles {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@ManyToMany(() => fm_worker)
	@JoinTable()
	workers?: fm_worker[];

	@ManyToMany(() => fm_client)
	@JoinTable()
	clients?: fm_client[];

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
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_worker from './fm_worker';
import fm_client from './fm_client';

@Entity()
export default class fm_roles {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@ManyToMany(() => fm_worker)
	@JoinTable()
	workers?: fm_worker[];

	@ManyToMany(() => fm_client)
	@JoinTable()
	clients?: fm_client[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
