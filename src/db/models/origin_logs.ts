import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany } from 'typeorm';
import general_logs from './general_logs';

@Entity({ synchronize: true })
export default class origin_logs {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	name!: string;

	@OneToMany(() => general_logs, (general_logs) => general_logs.id_origin_logs_carropago)
	@JoinColumn({ name: 'general_logs' })
	general_logs?: general_logs[];
}
