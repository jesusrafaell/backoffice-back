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
export default class fm_actions {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_permissions, (fm_permissions) => fm_permissions.id_action)
	@JoinColumn({ name: 'permissions' })
	permissions?: fm_permissions[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
