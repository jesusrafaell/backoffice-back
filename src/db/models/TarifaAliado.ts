import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import Aliados from './Aliados';

@Entity({ synchronize: false })
export default class TarifaAliado {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name!: string;

	@OneToMany(() => Aliados, (Aliados) => Aliados.aliIdUsuario)
	@JoinColumn({ name: 'aliados' })
	aliados?: Aliados[];
}
