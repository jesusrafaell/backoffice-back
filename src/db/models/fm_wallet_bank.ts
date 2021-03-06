import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_redes_tms7 from './fm_redes_tms7';
import fm_wallet_commerce from './fm_wallet_commerce';

@Entity()
export default class fm_wallet_bank {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: false })
	id_cartera!: number;

	@ManyToOne(() => fm_redes_tms7, (fm_redes_tms7) => fm_redes_tms7.wallet)
	@JoinColumn({ name: 'id_redes_tms7' })
	id_redes_tms7!: number;

	@OneToMany(() => fm_wallet_commerce, (fm_wallet_commerce) => fm_wallet_commerce.id_commerce)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_wallet_commerce[];

	@Column({ default: 1 })
	active?: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
