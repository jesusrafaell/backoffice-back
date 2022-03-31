import { getRepository } from 'typeorm';
import fm_type_diferido from '../models/fm_type_diferido';

const type_diferido = async (): Promise<void> => {
	const data: fm_type_diferido[] = [
		{
			name: 'Error Interno',
		},
		{
			name: 'Recaudo',
		},
	];
	//
	const valid = await getRepository(fm_type_diferido).find({ where: data });
	if (!valid.length) await getRepository(fm_type_diferido).save(data);
};

export default type_diferido;
