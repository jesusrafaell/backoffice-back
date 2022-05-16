import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_request from './fm_request';
import fm_status_request from './fm_status_request';
import fm_department from './fm_department';
import fm_photo from './fm_photo';

@Entity()
export default class fm_status_photo {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => fm_photo, (fm_photo) => fm_photo.id_status)
	@JoinColumn({ name: 'photo' })
	photo?: fm_photo[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
