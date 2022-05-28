import { getRepository } from 'typeorm';
import fm_wallet_bank from '../models/fm_wallet_bank';

const wallet_bank = async (): Promise<void> => {
	const data: fm_wallet_bank[] = [
		//1000pagos tms7
		{
			name: '1000pagos',
			net_id: 2,
			id_cartera: 1,
		},
		{
			name: 'Venezolano de Credito',
			net_id: 2,
			id_cartera: 2,
		},
		{
			name: 'Banco Exterior',
			net_id: 2,
			id_cartera: 3,
		},
		//No son 1000pagos tms7
		{
			name: 'Banco Delsur',
			net_id: 3,
			id_cartera: 4,
		},
		{
			name: 'Banco del Tesoro',
			net_id: 3,
			id_cartera: 5,
		},
		{
			name: 'Bancrecer',
			net_id: 3,
			id_cartera: 7,
		},
	];
	//
	const valid = await getRepository(fm_wallet_bank).find({ where: data });
	if (!valid.length) await getRepository(fm_wallet_bank).save(data);
};

export default wallet_bank;
