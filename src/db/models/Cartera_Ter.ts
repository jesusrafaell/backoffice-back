import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export default class Cartera_Ter {
	@Column({ nullable: true })
	Id!: number;

	@PrimaryGeneratedColumn()
	Cod_Cartera!: string;

	@Column({ nullable: true })
	Terminal_Id!: string;
}
