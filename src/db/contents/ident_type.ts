<<<<<<< HEAD
import fm_ident_type from '../models/fm_ident_type';
import { getRepository } from 'typeorm';

const ident_type = async (): Promise<void> => {
	const data: fm_ident_type[] = [
		{
			name: 'V',
		},
		{
			name: 'E',
		},
		{
			name: 'J',
		},
		{
			name: 'R',
		},
		{
			name: 'P',
		},
	];
	//
	const valid = await getRepository(fm_ident_type).find({ where: data });
	if (!valid.length) await getRepository(fm_ident_type).save(data);
};

export default ident_type;
=======
import fm_ident_type from '../models/fm_ident_type';
import { getRepository } from 'typeorm';

const ident_type = async (): Promise<void> => {
	const data: fm_ident_type[] = [
		{
			name: 'V',
		},
		{
			name: 'E',
		},
		{
			name: 'J',
		},
		{
			name: 'R',
		},
		{
			name: 'P',
		},
	];
	//
	const valid = await getRepository(fm_ident_type).find({ where: data });
	if (!valid.length) await getRepository(fm_ident_type).save(data);
};

export default ident_type;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
