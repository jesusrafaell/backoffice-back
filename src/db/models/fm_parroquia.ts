<<<<<<< HEAD
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_municipio from './fm_municipio';
import fm_location from './fm_location';

@Entity()
export default class fm_parroquia {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_municipio, (fm_municipio) => fm_municipio.parroquias)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio!: number;

	@OneToMany(() => fm_location, (fm_location) => fm_location.id_parroquia)
	@JoinColumn({ name: 'locations' })
	locations?: fm_location[];

	@Column({ nullable: true })
	parroquia!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
=======
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import fm_municipio from './fm_municipio';
import fm_location from './fm_location';

@Entity()
export default class fm_parroquia {
	@PrimaryGeneratedColumn()
	id?: number;

	@ManyToOne(() => fm_municipio, (fm_municipio) => fm_municipio.parroquias)
	@JoinColumn({ name: 'id_municipio' })
	id_municipio!: number;

	@OneToMany(() => fm_location, (fm_location) => fm_location.id_parroquia)
	@JoinColumn({ name: 'locations' })
	locations?: fm_location[];

	@Column({ nullable: true })
	parroquia!: string;

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
