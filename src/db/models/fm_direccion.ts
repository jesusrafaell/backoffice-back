import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ synchronize: true })
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

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
