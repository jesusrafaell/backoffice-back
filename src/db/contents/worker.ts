import { getRepository } from 'typeorm';
import fm_worker from '../models/fm_worker';

const worker = async (): Promise<void> => {
	const data: fm_worker[] = [
		{
			name: 'Armando',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345677',
			email: 'armando@example.com',
			phone: '+584444848',
			id_company: 1,
			id_rol: 4,
			id_department: 8,
		},
		{
			name: 'Jesus',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345678',
			email: 'work@correo.com',
			phone: '+584444848',
			id_company: 1,
			id_rol: 4,
			id_department: 8,
		},
		{
			name: 'Aldrin',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '12345679',
			email: 'aetour.ca@gmail.com',
			phone: '+584444848',
			id_company: 1,
			id_rol: 4,
			id_department: 8,
		},
		{
			name: 'Carlos',
			last_name: 'test',
			password: '$2b$10$4fYNDPFNI8TzB/scddXfV.hsgXtPfi8jFAp7MOujpeSfB0TbtO6fe', //Test123.
			id_ident_type: 1,
			ident_num: '123456777',
			email: 'carlos@correo.com',
			phone: '+584242552345',
			id_rol: 4,
			id_company: 1,
			id_department: 8,
		},
		{
			name: 'Glenda',
			last_name: 'Vielma',
			password: '$2b$10$D5OjXn/pk4Z23OMMarCh0ePIF1ox6m9XVGXCAoXu9m.W7p7iYkiDS',
			id_ident_type: 1,
			ident_num: '6670156',
			email: 'gvielma@1000pagos.com',
			phone: '+584141126131',
			id_company: 2,
			id_department: 4,
		},
		{
			name: 'Gimmy',
			last_name: 'Rodriguez',
			password: '$2b$10$oof1DlCFppKm.3gc//e4ju3Qg22YggeNhPT6AHlunHnJDBZgSkzu.',
			id_ident_type: 1,
			ident_num: '13717142',
			email: 'grodriguez@tranred.com.ve',
			phone: '+584127202413',
			id_company: 2,
			id_department: 4,
		},
		{
			name: 'Luis',
			last_name: 'Paez',
			password: '$2b$10$QiR6pG66Dv7qAX5XNY4YqOhbW49vw90xoUQJ3R5O3sownj/v4X7eS',
			id_ident_type: 1,
			ident_num: '20791997',
			email: 'lpaez@tranred.com.ve',
			phone: '+584143169663',
			id_company: 2,
			id_department: 4,
		},
		{
			name: 'Isis',
			last_name: 'Mata',
			password: '$2b$10$N9LMDR7T2WWv3Jv4dEvVzuNzKREEIZI7lPfClx4vwH/KwpqkcwVdu',
			id_ident_type: 1,
			ident_num: '25210419',
			email: 'imata@1000pagos.com',
			phone: '+584165186697',
			id_company: 1,
			id_department: 4,
		},
	];
	const valid = await getRepository(fm_worker).find();
	if (!valid.length) await getRepository(fm_worker).save(data);
};

export default worker;
