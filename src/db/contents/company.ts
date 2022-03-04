<<<<<<< HEAD
import { getRepository } from 'typeorm';
import fm_company from '../models/fm_company';

const company = async (): Promise<void> => {
	const data: fm_company[] = [
		{
			name: 'Tranred',
		},
		{
			name: '1000pagos',
		},
		{
			name: 'DigoPago',
		},
	];

	//
	const valid = await getRepository(fm_company).find({ where: data });
	if (!valid.length) await getRepository(fm_company).save(data);
};

export default company;
=======
import { getRepository } from 'typeorm';
import fm_company from '../models/fm_company';

const company = async (): Promise<void> => {
	const data: fm_company[] = [
		{
			name: 'Tranred',
		},
		{
			name: '1000pagos',
		},
		{
			name: 'DigoPago',
		},
	];

	//
	const valid = await getRepository(fm_company).find({ where: data });
	if (!valid.length) await getRepository(fm_company).save(data);
};

export default company;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
