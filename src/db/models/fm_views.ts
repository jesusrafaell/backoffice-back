import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	Index,
} from 'typeorm';
import fm_acces_views from './fm_access_views';

@Entity()
@Index(['root'], { unique: true })
export default class fm_views {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	root!: string;

	@OneToMany(() => fm_acces_views, (fm_acces_views) => fm_acces_views.id_views)
	@JoinColumn({ name: 'acces_views' })
	acces_views?: fm_acces_views[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
