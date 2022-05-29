import { getRepository } from 'typeorm';
import fm_roles from '../models/fm_roles';

export const listRoles: fm_roles[] = [
	{
		name: 'Base',
	},
	{
		name: 'Trabajador',
	},
	{
		name: 'Supervisor',
	},
	{
		name: 'Admin',
	},
];

const roles = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_roles).find({ where: listRoles });
	if (!valid.length) await getRepository(fm_roles).save(listRoles);
};

export default roles;
