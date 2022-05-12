import fm_commerce from './fm_commerce';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import TarifaAliado from './TarifaAliado';

@Entity({ synchronize: false })
export default class Afiliados {
	@PrimaryGeneratedColumn()
	afiCod?: string;

	@Column()
	afiDesc!: string;

	@Column()
	afiCodTipoPer!: number;

	@Column()
	afiFreg!: string;

	@Column()
	afiCodBan!: string;

	@Column()
	afiNroCuenta!: string;
}
