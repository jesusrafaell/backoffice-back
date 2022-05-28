import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, Index } from 'typeorm';
import fm_department from './fm_department';
import fm_views from './fm_views';

@Entity()
@Index(['id_department', 'id_views'], { unique: true })
export default class fm_access_views {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_department, (fm_department) => fm_department.access_views)
	@JoinColumn({ name: 'id_department' })
	id_department!: number;

	@ManyToOne(() => fm_views, (fm_views) => fm_views.acces_views)
	@JoinColumn({ name: 'id_views' })
	id_views!: number;

	@Column({ default: 1 })
	active?: number;
}
