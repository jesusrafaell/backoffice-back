import { colearOneSolic } from 'services/socket/controllers/admition';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import origin_logs from './origin_logs';

@Entity({ synchronize: true })
export default class general_logs {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	email!: string;

	@Column()
	descript!: string;

	@ManyToOne(() => origin_logs, (origin_logs) => origin_logs.general_logs)
	@JoinColumn({ name: 'id_origin_logs_carropago' })
	id_origin_logs_carropago!: number;

	@CreateDateColumn()
	createdAt?: Date;
}
