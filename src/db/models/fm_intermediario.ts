import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_photo from './fm_photo';
import fm_request from './fm_request';
import fm_payment_method from './fm_payment_method';
import fm_posXcommerce from './fm_posXcommerce';
import fm_product from './fm_product';

@Entity()
export default class fm_intermediario {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: true })
	description!: string;

	@OneToMany(() => fm_product, (fm_product) => fm_product.id_intermediario)
	@JoinColumn({ name: 'products' })
	products?: fm_product[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
