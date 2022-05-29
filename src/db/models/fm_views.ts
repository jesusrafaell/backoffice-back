import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import fm_acces_views from './fm_access_views';

@Entity()
export default class fm_views {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

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
