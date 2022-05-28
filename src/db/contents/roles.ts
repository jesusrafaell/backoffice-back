import { getRepository } from 'typeorm';
import fm_roles from '../models/fm_roles';

export const listRoles: fm_roles[] = [
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

const roles = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_roles).find({ where: listRoles });
	if (!valid.length) await getRepository(fm_roles).save(listRoles);
};

export default roles;
