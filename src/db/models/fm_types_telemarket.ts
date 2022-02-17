import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_telemercadeo from './fm_telemercadeo';

@Entity()
export default class fm_types_telemarket {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => fm_telemercadeo, (fm_telemercadeo) => fm_telemercadeo.id_types_telemarket)
	@JoinColumn({ name: 'telemercadeo' })
	telemercadeo?: fm_telemercadeo[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
