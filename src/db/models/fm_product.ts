import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToMany,
	JoinColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';
import fm_photo from './fm_photo';
import fm_request from './fm_request';
import fm_payment_method from './fm_payment_method';
import fm_posXcommerce from './fm_posXcommerce';

@Entity()
export default class fm_product {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	description!: string;

	@Column({ nullable: true })
	price!: number;

	@Column({ nullable: true })
	modelo!: string;

	@Column({ nullable: true })
	provedor!: number;

	@ManyToMany(() => fm_photo)
	@JoinTable()
	photos?: fm_photo[];

	@Column({ name: 'quota', default: 50 })
	quota!: number;

	@OneToMany(() => fm_posXcommerce, (fm_posXcommerce) => fm_posXcommerce.id_product)
	@JoinColumn({ name: 'pos' })
	pos?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
