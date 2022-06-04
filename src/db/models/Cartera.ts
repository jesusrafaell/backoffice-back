import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import fm_posXcommerce from './fm_posXcommerce';

@Entity({ synchronize: false })
export default class Cartera {
	@PrimaryGeneratedColumn()
	Cod_Cartera!: string;

	@Column({ nullable: true })
	Id!: number;

	@Column({ nullable: true })
	Nombre_Org!: string;
}
