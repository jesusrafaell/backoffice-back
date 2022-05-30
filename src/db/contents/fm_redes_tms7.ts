import { getRepository } from 'typeorm';
import fm_redes_tms7 from '../models/fm_redes_tms7';

export const listRedes: fm_redes_tms7[] = [
	{
		//1
		name: '1000pagos',
		net_id: 2,
		parametrization: 'IP publico - Pruebas GER7',
		version: 12,
	},
	{
		//2
		name: 'otros bancos',
		net_id: 2,
		parametrization: 'Comercio',
		version: 1,
	},
];

const redes_tms7 = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_redes_tms7).find({ where: listRedes });
	if (!valid.length) await getRepository(fm_redes_tms7).save(listRedes);
};

export default redes_tms7;
