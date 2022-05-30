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
import fm_wallet_bank from './fm_wallet_bank';

@Entity()
export default class fm_redes_tms7 {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@Column({ nullable: false })
	net_id!: number;

	@Column({ nullable: false })
	parametrization!: string;

	@Column({ nullable: false })
	version!: number;

	@Column({ default: 1 })
	active?: number;

	@OneToMany(() => fm_wallet_bank, (fm_wallet_bank) => fm_wallet_bank.id_redes_tms7)
	@JoinColumn({ name: 'wallet' })
	wallet?: fm_wallet_bank[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
