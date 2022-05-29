// create table with id primary key and name string in typeorm
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Index,
} from 'typeorm';
import fm_commerce from './fm_commerce';
import fm_wallet_bank from './fm_wallet_bank';

@Entity()
@Index(['id_commerce', 'id_wallet_bank'], { unique: true })
export default class fm_wallet_commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_commerce, (fm_commerce) => fm_commerce.wallet_commerce)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@ManyToOne(() => fm_wallet_bank, (fm_wallet_bank) => fm_wallet_bank.commerces)
	@JoinColumn({ name: 'id_wallet_bank' })
	id_wallet_bank!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
