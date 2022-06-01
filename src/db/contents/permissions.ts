import { getRepository } from 'typeorm';
import fm_roles from '../models/fm_roles';
import fm_actions from '../models/fm_actions';
import fm_permissions from '../models/fm_permissions';
import fm_department from '../models/fm_department';
//
import { listActions } from './actions';
import { listRoles } from './roles';
import { listDeparment } from './department';

const permissions = async (): Promise<void> => {
	//create Base para todo los departamentos
	let dataPre: fm_permissions[] = [];
	listDeparment.map((item: fm_department, index: number) => {
		listRoles.map((rol: fm_department, indexRol: number) => {
			dataPre.push({
				id_department: index + 1,
				id_rol: indexRol + 1, //base
				id_action: 1, //base
			});
		});
	});

	let data: fm_permissions[] = [
		//fuerza de venta
		{
			id_department: 2,
			id_rol: 2,
			id_action: 2,
		},
		//seguridad
		{
			id_department: 3,
			id_rol: 2,
			id_action: 6,
		},
		{
			id_department: 3,
			id_rol: 2,
			id_action: 7,
		},
		{
			id_department: 3,
			id_rol: 6,
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
		//cobranza
		{
			id_department: 5,
			id_rol: 2,
			id_action: 9,
		},
		//adminstracion
		{
			id_department: 7,
			id_rol: 2,
			id_action: 9,
		},
	];
	data = dataPre.concat(data);

	//admision worker/super/admin
	listRoles.map((item: fm_roles, index: number) => {
		if (index !== 0) {
			for (let i = 2; i <= 4; i++) {
				data.push({
					id_department: 4, //admision
					id_rol: index + 1, //worker
					id_action: i, //todos los de admision
				});
			}
		}
	});

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

	//Presidencia no permisos
	/*
	listActions.map((item: fm_actions, index: number) => {
		if (index !== 0 && (index < 5 || index > 7))
			data.push({
				id_department: 10,
				id_rol: 1, //
				id_action: 1, //todos
			});
	});
	*/

	const valid = await getRepository(fm_permissions).find({ where: data });
	if (!valid.length) await getRepository(fm_permissions).save(data);
};

export default permissions;
