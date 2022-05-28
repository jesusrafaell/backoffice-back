import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Cartera from './Cartera';
import fm_commerce from './fm_commerce';

@Entity()
export default class fm_wallet_bank {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: false })
	net_id!: number;

	@Column({ nullable: false })
	id_cartera!: number;

	@Column({ default: 1 })
	active?: number;

	@ManyToMany(() => fm_commerce)
	@JoinTable()
	commerce?: fm_commerce[];
}
