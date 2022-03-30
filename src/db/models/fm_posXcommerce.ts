import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	JoinColumn,
	ManyToMany,
	ManyToOne,
	OneToOne,
	JoinTable,
} from 'typeorm';
import Cartera_Ter from './Cartera_Ter';
import fm_commerce from './fm_commerce';
import fm_location from './fm_location';
import fm_product from './fm_product';
import fm_request from './fm_request';

@Entity()
export default class fm_posXcommerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_location, (fm_location) => fm_location.pos)
	@JoinColumn({ name: 'id_location' })
	id_location!: number;

	@ManyToOne(() => fm_commerce, (fm_Commerce) => fm_Commerce.pos)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_request, (fm_request) => fm_request.pos)
	@JoinColumn({ name: 'id_request' })
	id_request?: number;

	@Column({ nullable: true, default: null })
	aboTerminal?: string;

	@Column({ nullable: true, default: null })
	serial?: string;

	@Column({ nullable: true })
	id_cartera?: number;

	@Column({ nullable: true })
	id_cartera_ter?: number;

	@ManyToOne(() => fm_product, (fm_product) => fm_product.pos)
	@JoinColumn({ name: 'id_product' })
	id_product!: number;

	/*
	@Column({ name: 'id_status', default: 1 })
	@ManyToMany(() => fm_status_pos)
	@JoinTable()
	id_status!: fm_status_pos[];
	*/
}
