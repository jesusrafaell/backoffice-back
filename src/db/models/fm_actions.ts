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
import fm_permissions from './fm_permissions';
import fm_views from './fm_views';

@Entity()
export default class fm_actions {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	description!: string;

	@ManyToOne(() => fm_views, (fm_views) => fm_views.actions)
	@JoinColumn({ name: 'id_views' })
	id_views!: number;

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
