import { getRepository } from 'typeorm';
import fm_roles from '../models/fm_roles';

const roles = async (): Promise<void> => {
	const data: fm_roles[] = [
		{
			name: 'base',
		},
		{
			name: 'worker',
		},
		{
			name: 'supervisor',
		},
		{
			name: 'admin',
		},
	];
	//
	const valid = await getRepository(fm_roles).find({ where: data });
	if (!valid.length) await getRepository(fm_roles).save(data);
};

export default roles;
