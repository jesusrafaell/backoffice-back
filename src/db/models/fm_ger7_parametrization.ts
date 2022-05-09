import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from 'typeorm';

@Entity()
export default class fm_ger7_parametrization {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@Column()
	version!: number;

	@Column({ nullable: true })
	desc?: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
