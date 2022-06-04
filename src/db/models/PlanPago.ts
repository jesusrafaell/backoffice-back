import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import Planes from './Planes';

@Entity('PlanPago', { synchronize: false })
export default class PlanPago {
	@PrimaryGeneratedColumn()
	planPagoId?: number;

	@ManyToOne(() => Planes, (Planes) => Planes.planpago)
	@JoinColumn({ name: 'planId' })
	planId!: number;

	@Column()
	aboCodAfi!: string;

	@Column()
	aboCodComercio!: number;

	@Column()
	aboTerminal!: string;

	@Column()
	estatusId!: number;

	@Column({ nullable: true, default: null })
	montoTarifa?: number;

	@Column({ nullable: true, default: null })
	frecuenciaId?: number;

	@Column()
	fechaInicio?: Date;

	@Column({ nullable: true, default: null })
	fechaFin?: Date;

	@Column({ nullable: true, default: null })
	montoInicial?: number;

	@Column({ nullable: true, default: null })
	cantCuotas?: number;

	@Column({ nullable: true, default: null })
	montoFijo?: number;

	@Column({ nullable: true, default: null })
	porcComisionBancaria?: number;
}
