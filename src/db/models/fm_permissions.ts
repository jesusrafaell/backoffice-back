import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	Column,
	Index,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_department from './fm_department';
import fm_actions from './fm_actions';
import fm_roles from './fm_roles';

@Entity()
@Index(['id_department', 'id_rol', 'id_action'], { unique: true })
export default class fm_permissions {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_department, (fm_department) => fm_department.permissions)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@ManyToOne(() => fm_roles, (fm_roles) => fm_roles.permissions)
	@JoinColumn({ name: 'id_rol' })
	id_rol!: number;

	@ManyToOne(() => fm_actions, (fm_actions) => fm_actions.permissions)
	@JoinColumn({ name: 'id_action' })
	id_action!: number;

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
