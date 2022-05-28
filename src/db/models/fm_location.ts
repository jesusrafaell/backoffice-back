// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';
import fm_client from './fm_client';
import fm_commerce from './fm_commerce';
import fm_posXcommerce from './fm_posXcommerce';
import fm_direccion from './fm_direccion';

@Entity()
export default class fm_location {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_direccion)
	@JoinColumn({ name: 'id_direccion' })
	id_direccion!: number;

	@OneToMany(() => fm_posXcommerce, (fm_posXcommerce) => fm_posXcommerce.id_location)
	@JoinColumn({ name: 'pos' })
	pos?: fm_posXcommerce[];

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_location)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];

	@OneToMany(() => fm_client, (fm_client) => fm_client.id_location)
	@JoinColumn({ name: 'clients' })
	clients?: fm_client[];

	@Column({ nullable: true })
	calle!: string;

	@Column({ nullable: true })
	local!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
