import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity({ synchronize: false })
export default class fm_direccion {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column()
	estado!: string;

	@Column()
	ciudad!: string;

	@Column()
	municipio!: string;

	@Column()
	parroquia!: string;

	@Column()
	sector!: string;

	@Column()
	codigoPostal!: string;
}
