import { getRepository } from 'typeorm';
import fm_types_telemarket from '../models/fm_types_telemarket';

const type_telemarket = async (): Promise<void> => {
	const data: fm_types_telemarket[] = [
		{
			name: 'Externo',
		},
		{
			name: 'Interno',
		},
	];

	//
	const valid = await getRepository(fm_types_telemarket).find({ where: data });
	if (!valid.length) await getRepository(fm_types_telemarket).save(data);
};

export default type_telemarket;
