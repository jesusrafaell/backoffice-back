<<<<<<< HEAD
import fm_roles from '../models/fm_roles';
import { getRepository } from 'typeorm';
import fm_phone from '../models/fm_phone';

const phone = async (): Promise<void> => {
	const data: fm_phone[] = [
		{
			phone: '+5841811161',
			id_client: 1,
		},
		{
			phone: '+5841811161',
			id_client: 1,
		},
	];
	//
	const valid = await getRepository(fm_phone).find({ where: data });
	if (!valid.length) await getRepository(fm_phone).save(data);
};

export default phone;
=======
import fm_roles from '../models/fm_roles';
import { getRepository } from 'typeorm';
import fm_phone from '../models/fm_phone';

const phone = async (): Promise<void> => {
	const data: fm_phone[] = [
		{
			phone: '+5841811161',
			id_client: 1,
		},
		{
			phone: '+5841811161',
			id_client: 1,
		},
	];
	//
	const valid = await getRepository(fm_phone).find({ where: data });
	if (!valid.length) await getRepository(fm_phone).save(data);
};

export default phone;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
