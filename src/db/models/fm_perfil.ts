import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	ManyToOne,
} from 'typeorm';
import fm_department from './fm_department';
import fm_permissions from './fm_permissions';

@Entity()
export default class fm_perfil {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_permissions, (fm_permissions) => fm_permissions.id_perfil)
	@JoinColumn({ name: 'permissions' })
	permissions?: fm_permissions[];

	@ManyToOne(() => fm_department, (fm_department) => fm_department.perfil)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
