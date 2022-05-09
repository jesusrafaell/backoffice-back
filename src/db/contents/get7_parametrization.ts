import fm_ger7_parametrization from '../models/fm_ger7_parametrization';
import { getRepository } from 'typeorm';

const ger7_parametrization = async (): Promise<void> => {
	const data: fm_ger7_parametrization[] = [
		{
			name: 'COMERCIOS - Pruebas 1 718',
			version: 1,
			desc: 'Perfil de parámetros tipo COMERCIOS Transaccion de PreAutorizacion y completitud NO habilitadas',
		},
	];
	//
	const valid = await getRepository(fm_ger7_parametrization).find({ where: data });
	if (!valid.length) await getRepository(fm_ger7_parametrization).save(data);
};

export default ger7_parametrization;
