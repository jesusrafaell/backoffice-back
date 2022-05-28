import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, Index } from 'typeorm';
import fm_department from './fm_department';
import fm_perfil from './fm_perfil';
import fm_roles from './fm_roles';

@Entity()
@Index(['id_department', 'id_rol', 'id_perfil'], { unique: true })
export default class fm_permissions {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_department, (fm_department) => fm_department.permissions)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@ManyToOne(() => fm_roles, (fm_roles) => fm_roles.permissions)
	@JoinColumn({ name: 'id_rol' })
	id_rol!: number;

	@ManyToOne(() => fm_perfil, (fm_perfil) => fm_perfil.permissions)
	@JoinColumn({ name: 'id_perfil' })
	id_perfil!: number;

	@Column({ default: 1 })
	active?: number;
}
