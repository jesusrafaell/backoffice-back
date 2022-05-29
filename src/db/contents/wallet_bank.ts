import { getRepository } from 'typeorm';
import fm_wallet_bank from '../models/fm_wallet_bank';

const wallet_bank = async (): Promise<void> => {
	const data: fm_wallet_bank[] = [
		//1000pagos tms7
		{
			//1
			name: '1000pagos',
			net_id: 2,
			id_cartera: 1,
			tms7_codSubacquirer: '0720004108',
		},
		{
			//2
			name: 'Venezolano de Credito',
			net_id: 11,
			id_cartera: 2,
			tms7_codSubacquirer: '0720004108',
		},
		{
			//3
			name: 'Banco Exterior',
			net_id: 11,
			id_cartera: 3,
			tms7_codSubacquirer: '0720004108',
		},
		//No son 1000pagos tms7
		{
			//4
			name: 'Banco Delsur',
			net_id: 11,
			id_cartera: 4,
			tms7_codSubacquirer: '0720004108',
		},
		{
			//5
			name: 'Banco del Tesoro',
			net_id: 11,
			id_cartera: 5,
			tms7_codSubacquirer: '0720004108',
		},
		{
			//6
			name: 'Bancrecer',
			net_id: 11,
			id_cartera: 7,
			tms7_codSubacquirer: '0720004108',
		},
	];
	//
	const valid = await getRepository(fm_wallet_bank).find({ where: data });

	//2
	if (!valid.length) await getRepository(fm_wallet_bank).save(data);
};

export default wallet_bank;
