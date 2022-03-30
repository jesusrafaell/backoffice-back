import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import fm_posXcommerce from './fm_posXcommerce';

@Entity({ synchronize: false })
export default class Cartera {
	@Column({ nullable: true })
	Id!: number;

	@PrimaryGeneratedColumn()
	Cod_Cartera!: string;

	@Column({ nullable: true })
	Nombre_Org!: string;
}
