import { getRepository } from 'typeorm';
import fm_product from '../models/fm_product';

const product = async (): Promise<void> => {
	const data: fm_product[] = [
		{
			name: 'WP PAR-I',
			modelo: 'IWL250 GPRS',
			provedor: 6,
			price: 350,
			description: 'El mejor equipo',
			quota: 50,
		},
		{
			name: 'DIAL-UP DUAL',
			modelo: 'ICT220 DUAL',
			provedor: 8,
			price: 350,
			description: 'El mejor equipo',
			quota: 50,
		},
		{
			name: 'DIAL-UP GPRS',
			modelo: 'IWL250 GPRS',
			provedor: 9,
			price: 200,
			description: 'El mejor equipo',
			quota: 50,
		},
	];
	//
	const valid = await getRepository(fm_product).find({ where: data });
	if (!valid.length) await getRepository(fm_product).save(data);
};

export default product;
