import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import TarifaAliado from './TarifaAliado';

@Entity({ synchronize: false })
export default class Abonos {
	@PrimaryGeneratedColumn()
	aboCod?: number;

	@Column()
	aboTerminal!: string;

	@Column()
	aboCodAfi!: string;

	@Column()
	aboCodComercio!: number;

	@Column()
	aboCodBanco!: string;

	@Column()
	aboNroCuenta!: string;

	@Column()
	aboTipoCuenta!: string;

	@Column({ nullable: true, default: null })
	aboFreg?: string;

	@Column()
	estatusId!: number;

	@Column()
	pagoContado!: number;

	@Column({ nullable: true, default: null })
	fechaPago?: Date;

	@Column({ nullable: true, default: null })
	montoEquipoUSD?: number;

	@Column({ nullable: true, default: null })
	ivaEquipoBs?: number;

	@Column({ nullable: true, default: null })
	montoTotalEquipoBs?: number;
}
