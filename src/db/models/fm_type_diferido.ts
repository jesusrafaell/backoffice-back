// create table with id primary key and name string in typeorm
import {
	Entity,
	PrimaryGeneratedColumn,
	JoinColumn,
	ManyToOne,
	OneToOne,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
	OneToMany,
} from 'typeorm';
import fm_valid_request from './fm_valid_request';

@Entity()
export default class fm_type_diferido {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_client' })
	fm_td_client?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_commerce' })
	fm_td_commerce?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_pos?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_ref_bank?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_comp_num?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_consitutive_acta?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_planilla?: fm_valid_request[];

	@OneToMany(() => fm_valid_request, (fm_valid_request) => fm_valid_request.id_typedif_client)
	@JoinColumn({ name: 'fm_type_pos' })
	fm_td_special_contributor?: fm_valid_request[];
}
