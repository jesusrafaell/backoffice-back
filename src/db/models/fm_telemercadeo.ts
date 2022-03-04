import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_types_telemarket from './fm_types_telemarket';

@Entity()
export default class fm_telemercadeo {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_types_telemarket, (fm_types_telemarket) => fm_types_telemarket.telemercadeo)
	@JoinColumn({ name: 'id_types_telemarket' })
	id_types_telemarket!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
