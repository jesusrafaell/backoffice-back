import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_worker from './fm_worker';
import fm_permissions from './fm_permissions';

@Entity()
export default class fm_roles {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_worker, (fm_worker) => fm_worker.id_ident_type)
	@JoinColumn({ name: 'workers' })
	workers?: fm_worker[];

	/*
	@ManyToMany(() => fm_client)
	@JoinTable()
	clients?: fm_client[];
	*/

	@OneToMany(() => fm_permissions, (fm_permissions) => fm_permissions.id_rol)
	@JoinColumn({ name: 'permissions' })
	permissions?: fm_permissions[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
