import fm_commerce from './fm_commerce';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import TarifaAliado from './TarifaAliado';

@Entity({ synchronize: false })
export default class Aliados {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => TarifaAliado, (TarifaAliado) => TarifaAliado.aliados)
	@JoinColumn({ name: 'aliIdUsuario' })
	aliIdUsuario!: number;

	@Column()
	aliTipoIdentificacion!: string;

	@Column()
	aliIdentificacion!: string;

	@Column()
	aliApellidos!: string;

	@Column()
	aliNombres!: string;

	@Column()
	aliSexo!: string;

	@Column()
	aliFechaNacimiento!: string;

	@Column()
	aliCodigoTelHabitacion!: string;

	@Column()
	aliTelefonoHabitacion!: string;

	@Column()
	aliCodigoCelular!: string;

	@Column()
	aliCelular!: string;

	@Column()
	aliEmail!: string;

	@Column()
	aliProfesion!: string;

	@Column()
	aliDireccion!: string;

	@Column()
	aliCodZonaAtencion!: number;

	@Column()
	aliCodModalidadPago!: number;

	@Column()
	aliCuentaAbono!: string;

	@Column()
	aliObservaciones!: string;

	@Column()
	aliCodEstatus!: number;

	@Column()
	aliRecaudos!: string;

	@OneToMany(() => fm_commerce, (fm_commerce) => fm_commerce.id_aci)
	@JoinColumn({ name: 'commerces' })
	commerces?: fm_commerce[];
}
