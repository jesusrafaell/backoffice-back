import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import fm_type_diferido from './fm_type_diferido';

@Entity()
export default class fm_valid_request {
	@PrimaryGeneratedColumn()
	id?: number;

	//Motivos para diferido
	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_type_diferido)
	@JoinColumn({ name: 'id_typedif_client' })
	id_typedif_client!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_type_diferido)
	@JoinColumn({ name: 'id_typedif_commerce' })
	id_typedif_commerce!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_type_diferido)
	@JoinColumn({ name: 'id_typedif_pos' })
	id_typedif_pos!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_type_diferido)
	@JoinColumn({ name: 'id_typedif_ref_bank' })
	id_typedif_ref_bank!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@OneToOne(() => fm_type_diferido)
	@JoinColumn({ name: 'id_typedif_comp_num' })
	id_typedif_comp_num!: number | fm_type_diferido;

	//Recaudos
	@Column({ name: 'valid_constitutive_act' })
	valid_constitutive_act!: string;

	@Column({ name: 'valid_special_contributor' })
	valid_special_contributor!: string;

	@Column({ name: 'valid_ref_bank' })
	valid_ref_bank!: string;

	@Column({ name: 'valid_planilla' })
	valid_planilla!: string;

	@Column({ name: 'valid_comp_dep' })
	valid_comp_dep!: string;

	@Column({ name: 'valid_rif' })
	valid_rif!: string;

	@Column({ name: 'valid_ident_card' })
	valid_ident_card!: string;
}
