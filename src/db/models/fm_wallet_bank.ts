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
import fm_wallet_commerce from './fm_wallet_commerce';

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

	@Column({ nullable: false })
	tms7_codSubacquirer!: string;

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
