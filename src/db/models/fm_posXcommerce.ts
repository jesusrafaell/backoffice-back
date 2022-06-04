import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import Abonos from './Abonos';
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
	terminal?: string;

	@Column({ nullable: true, default: null })
	serial?: string;

	@Column({ default: 1 })
	active?: number;

	@ManyToOne(() => fm_product, (fm_product) => fm_product.pos)
	@JoinColumn({ name: 'id_product' })
	id_product!: number;
}
