import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import PlanPago from './PlanPago';

@Entity({ synchronize: false })
export default class Planes {
	@PrimaryGeneratedColumn()
	planId?: number;

	@Column()
	codTipoPlan!: string;

	@Column()
	planNombre!: string;

	@Column()
	planDesc!: string;

	@Column()
	montoTarifa!: string;

	@Column()
	planPlazo!: string;

	@Column()
	fechaInicio!: string;

	@Column()
	fechaFin!: string;

	@Column()
	indefinido!: string;

	@Column()
	frecuenciaId!: string;

	@Column()
	monedaId!: string;

	@Column()
	estatusId!: string;

	@Column()
	montoPromedio!: string;

	@Column()
	cantidadTransacciones!: string;

	@Column()
	cantidadDiasImpago!: string;

	@Column()
	porcentajeImpago!: string;

	@Column()
	montoInicial!: string;

	@Column()
	cantCuotas!: string;

	@Column()
	montoFijo!: string;

	@Column()
	porcComisionBancaria!: string;

	@OneToMany(() => PlanPago, (PlanPago) => PlanPago.planId)
	@JoinColumn({ name: 'planpago' })
	planpago?: PlanPago[];
}
