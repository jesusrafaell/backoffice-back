import { getRepository } from 'typeorm';
import fm_telemercadeo from '../models/fm_telemercadeo';

const telemercadeo = async (): Promise<void> => {
	const data: fm_telemercadeo[] = [
		{
			name: 'DirectaGruop',
			id_types_telemarket: 1,
		},
		{
			name: 'Tuseguro.com',
			id_types_telemarket: 1,
		},
	];

	//
	const valid = await getRepository(fm_telemercadeo).find({ where: data });
	if (!valid.length) await getRepository(fm_telemercadeo).save(data);
};

export default telemercadeo;
