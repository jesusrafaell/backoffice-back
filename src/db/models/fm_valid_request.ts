import fm from 'services/office/router/fm';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import fm_type_diferido from './fm_type_diferido';

@Entity()
export default class fm_valid_request {
	@PrimaryGeneratedColumn()
	id?: number;

	//Motivos para diferido
	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_client)
	@JoinColumn({ name: 'id_typedif_client' })
	id_typedif_client!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_commerce)
	@JoinColumn({ name: 'id_typedif_commerce' })
	id_typedif_commerce!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_pos)
	@JoinColumn({ name: 'id_typedif_pos' })
	id_typedif_pos!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_ref_bank)
	@JoinColumn({ name: 'id_typedif_ref_bank' })
	id_typedif_ref_bank!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_comp_num)
	@JoinColumn({ name: 'id_typedif_comp_num' })
	id_typedif_comp_num!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_consitutive_acta)
	@JoinColumn({ name: 'id_typedif_consitutive_acta' })
	id_typedif_consitutive_acta!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_planilla)
	@JoinColumn({ name: 'id_typedif_planilla' })
	id_typedif_planilla!: number | fm_type_diferido;

	@Column({ nullable: true, default: null })
	@ManyToOne(() => fm_type_diferido, (fm_type_diferido) => fm_type_diferido.fm_td_special_contributor)
	@JoinColumn({ name: 'id_typedif_special_contributor' })
	id_typedif_special_contributor!: number | fm_type_diferido;

	//Recaudos
	@Column({ name: 'valid_ident_card' })
	valid_ident_card!: string;

	@Column({ name: 'valid_rif' })
	valid_rif!: string;

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
}
