import { getRepository } from 'typeorm';
import fm_wallet_bank from '../models/fm_wallet_bank';

const wallet_bank = async (): Promise<void> => {
	const data: fm_wallet_bank[] = [
		//1000pagos tms7
		{
			//1
			name: '1000pagos',
			id_cartera: 1,
			id_redes_tms7: 1,
		},
		{
			//2
			name: 'Venezolano de Credito',
			id_cartera: 2,
			id_redes_tms7: 1,
		},
		{
			//3
			name: 'Banco Exterior',
			id_cartera: 3,
			id_redes_tms7: 2,
		},
		//No son 1000pagos tms7
		{
			//4
			name: 'Banco Delsur',
			id_cartera: 4,
			id_redes_tms7: 2,
		},
		{
			//5
			name: 'Banco del Tesoro',
			id_cartera: 5,
			id_redes_tms7: 2,
		},
		{
			//6
			name: 'Bancrecer',
			id_cartera: 7,
			id_redes_tms7: 2,
		},
	];
	//
	const valid = await getRepository(fm_wallet_bank).find({ where: data });

	//2
	if (!valid.length) await getRepository(fm_wallet_bank).save(data);
};

export default wallet_bank;
