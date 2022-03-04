<<<<<<< HEAD
import { getRepository } from 'typeorm';
import fm_type_request from '../models/fm_type_request';

const type_request = async (): Promise<void> => {
	const data: fm_type_request[] = [
		{
			name: 'Persona Natural',
		},
		{
			name: 'Persona Juridica',
		},
		{
			name: 'Firma Personal',
		},
		{
			name: 'Pos Extra',
		},
	];
	//
	const valid = await getRepository(fm_type_request).find({ where: data });
	if (!valid.length) await getRepository(fm_type_request).save(data);
};

export default type_request;
=======
import { getRepository } from 'typeorm';
import fm_type_request from '../models/fm_type_request';

const type_request = async (): Promise<void> => {
	const data: fm_type_request[] = [
		{
			name: 'Persona Natural',
		},
		{
			name: 'Persona Juridica',
		},
		{
			name: 'Firma Personal',
		},
		{
			name: 'Pos Extra',
		},
	];
	//
	const valid = await getRepository(fm_type_request).find({ where: data });
	if (!valid.length) await getRepository(fm_type_request).save(data);
};

export default type_request;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
