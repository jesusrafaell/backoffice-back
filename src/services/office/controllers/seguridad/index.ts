import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository, Not } from 'typeorm';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_department from '../../../../db/models/fm_department';
import fm_roles from '../../../../db/models/fm_roles';
import fm_permissions from '../../../../db/models/fm_permissions';
import fm_actions from '../../../../db/models/fm_actions';
import actions from 'db/contents/actions';

export const getDepartments = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_department).find({ active: 1, name: Not('God') });

		const message: string = Msg('deparments').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getRoles = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_roles).find({ active: 1 });

		const message: string = Msg('roles').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getPermissions = async (
	req: Request<Api.params, Api.Resp, { id_dep: number; id_rol: number }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_dep, id_rol }: any = req.params;

		const actions = await getRepository(fm_actions).find({ active: 1 });

		const permiss = await getRepository(fm_permissions).find({
			where: { id_rol, id_department: id_dep, active: 1 },
			relations: ['id_rol', 'id_department', 'id_action'],
		});

		const getListFormat = (perm: any[], action: any[]) => {
			let list: any = [];
			for (let j = 0; j < action.length; j++) {
				let flag = false;
				for (let i = 0; i < perm.length; i++) {
					if (action[j].id === perm[i].id_action.id) {
						flag = true;
						list.push({
							id: action[j].id,
							name: action[j].name,
							status: true,
						});
					}
				}
				if (!flag) {
					list.push({
						id: action[j].id,
						name: action[j].name,
						status: false,
					});
				}
			}
			return list;
		};

		const info = getListFormat(permiss, actions);

		const message: string = Msg('permissions').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const updatePermissions = async (
	req: Request<Api.params, Api.Resp, { id_dep: number; id_rol: number }, any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_dep, id_rol }: any = req.params;
		const newAction: any = req.body;

		const perm = await getRepository(fm_permissions).find({
			where: { id_rol, id_department: id_dep },
			relations: ['id_action'],
		});

		console.log(newAction);

		const saveListPermiss = async (perm: any[], action: any[]) => {
			let listSave: any[] = [];
			let listUpdate: any[] = [];
			for (let j = 0; j < action.length; j++) {
				let flag = false;
				for (let i = 0; i < perm.length; i++) {
					if (action[j].id === perm[i].id_action.id) {
						flag = true;
						listUpdate.push({
							id: perm[i].id,
							id_deparment: id_dep,
							id_rol,
							id_action: action[j].id,
							active: action[j].status ? 1 : 0,
						});
						await getRepository(fm_permissions).update(perm[i].id, {
							active: action[j].status ? 1 : 0,
						});
					}
				}
				if (!flag) {
					if (action[j].status)
						listSave.push({
							id_department: id_dep,
							id_rol: id_rol,
							id_action: action[j].id,
							active: action[j].status ? 1 : 0,
						});
				}
			}

			console.log('existente', listUpdate);
			console.log('crear', listSave);

			//if (listUpdate.length) await getRepository(fm_permissions).update(listUpdate, listUpdate);
			if (listSave.length) await getRepository(fm_permissions).save(listSave);
		};

		await saveListPermiss(perm, newAction);

		//console.log(perm);

		Resp(req, res, { message: 'update permiss' });
	} catch (err) {
		next(err);
	}
};
