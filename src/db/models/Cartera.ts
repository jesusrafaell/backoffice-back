import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Cartera {
	@Column({ nullable: true })
	Id!: number;

	@PrimaryGeneratedColumn()
	Cod_Cartera!: string;

	@Column({ nullable: true })
	Nombre_Org!: string;
}
