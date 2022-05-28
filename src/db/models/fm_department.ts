import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_permissions from './fm_permissions';
import fm_access_views from './fm_access_views';
import fm_status from './fm_status';
import fm_perfil from './fm_perfil';

@Entity()
export default class fm_department {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_status, (fm_status) => fm_status.id_department)
	@JoinColumn({ name: 'status' })
	status?: fm_status[];

	@OneToMany(() => fm_access_views, (fm_access_views) => fm_access_views.id_department)
	@JoinColumn({ name: 'access_views' })
	access_views?: fm_access_views[];

	@OneToMany(() => fm_permissions, (fm_permissions) => fm_permissions.id_department)
	@JoinColumn({ name: 'perfils' })
	permissions?: fm_permissions[];

	@OneToMany(() => fm_perfil, (fm_perfil) => fm_perfil.id_department)
	@JoinColumn({ name: 'perfil' })
	perfil?: fm_perfil[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
