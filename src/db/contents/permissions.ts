import { getRepository } from 'typeorm';
import fm_roles from '../models/fm_roles';
import fm_actions from '../models/fm_actions';
import fm_permissions from '../models/fm_permissions';
import fm_department from '../models/fm_department';
//
import { listActions } from './actions';
import { listRoles } from './roles';

const permissions = async (): Promise<void> => {
	//create Base para todo los departamentos
	let data: fm_permissions[] = [
		//fuerza de venta
		{
			id_department: 2,
			id_rol: 2, //work
			id_action: 2, //crear fm
		},
		//seguridad
		{
			id_department: 3, //se
			id_rol: 2, //work
			id_action: 6, //
		},
		{
			id_department: 3,
			id_rol: 2,
			id_action: 7,
		},
		{
			id_department: 3, //se
			id_rol: 4, //work
			id_action: 6, //
		},
		{
			id_department: 3,
			id_rol: 4,
			id_action: 7,
		},
		{
			id_department: 3,
			id_rol: 4,
			id_action: 8,
		},
		{
			id_department: 3,
			id_rol: 4,
			id_action: 9,
		},
		//colear en admision
		{
			id_department: 4,
			id_rol: 3,
			id_action: 5,
		},
	];

	//God
	listActions.map((action: fm_actions, i: number) => {
		if (i !== 0)
			listRoles.map((rol: fm_roles, iRol: number) => {
				if (iRol !== 0)
					data.push({
						id_department: 8, //God
						id_rol: iRol + 1, //todos
						id_action: i + 1, //todos
					});
			});
	});

	const valid = await getRepository(fm_permissions).find({ where: data });
	if (!valid.length) await getRepository(fm_permissions).save(data);
};

export default permissions;
