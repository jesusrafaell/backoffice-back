import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	JoinColumn,
	OneToMany,
	OneToOne,
	ManyToOne,
} from 'typeorm';
import fm_request from './fm_request';
import fm_commerce_constitutive_act from './fm_commerce_constitutive_act';
import fm_planilla from './fm_planilla';
import fm_status_photo from './fm_status_photo';

@Entity()
export default class fm_photo {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	path!: string;

	@Column({ nullable: true })
	name!: string;

	@Column({ default: 1 })
	@ManyToOne(() => fm_status_photo, (fm_status_photo) => fm_status_photo.photo)
	@JoinColumn({ name: 'id_status' })
	id_status?: number;

	@Column({ nullable: true })
	descript!: string;

	@OneToMany(() => fm_request, (fm_request) => fm_request)
	@JoinColumn()
	requests?: fm_request;

	@OneToOne(
		() => fm_commerce_constitutive_act,
		(fm_commerce_constitutive_act) => fm_commerce_constitutive_act.id_photo
	)
	@JoinColumn()
	rc_constitutive_act?: fm_commerce_constitutive_act;

	@OneToOne(() => fm_planilla, (fm_planilla) => fm_planilla.id_photo)
	@JoinColumn()
	rc_planilla?: fm_planilla;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
