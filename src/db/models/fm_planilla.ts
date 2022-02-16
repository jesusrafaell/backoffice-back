import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import fm_request from './fm_request';
import fm_photo from './fm_photo';

@Entity()
export default class fm_planilla {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_request, (fm_request) => fm_request.rc_planilla)
	@JoinColumn({ name: 'id_request' })
	id_request!: number | fm_request | null;

	@ManyToOne(() => fm_photo, (fm_photo) => fm_photo.rc_planilla)
	@JoinColumn({ name: 'id_photo' })
	id_photo!: number | fm_photo;
}
