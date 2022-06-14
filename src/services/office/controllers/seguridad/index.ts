import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository, Not } from 'typeorm';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_department from '../../../../db/models/fm_department';
import fm_roles from '../../../../db/models/fm_roles';
import fm_permissions from '../../../../db/models/fm_permissions';
import fm_actions from '../../../../db/models/fm_actions';
import fm_access_views from '../../../../db/models/fm_access_views';
import fm_views from '../../../../db/models/fm_views';
import { saveLogs } from '../../../../utilis/logs';
import list from 'services/office/Middlewares/token/list';

export const getDepartments = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { idDep }: any = req.headers.token;
		const ignore: string = idDep.name === 'God' ? '' : 'God';

		console.log('g', ignore);

		const info = await getRepository(fm_department).find({ name: Not(ignore) });

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

		let info = [];

		const viewsXdep = await getRepository(fm_department).findOne({
			where: { active: 1, id: id_dep },
			relations: ['access_views', 'access_views.id_views', 'access_views.id_views.actions'],
		});

		const { access_views }: any = viewsXdep;

		if (!access_views.length) {
			throw { message: 'No tiene niguna vista asignada' };
		}

		let actions: any = [];

		await access_views.forEach((item: any) => {
			//console.log(...item.id_views.actions);
			const { actions: acc, ...vis }: any = item.id_views;
			if (vis.id !== 1 && item.active)
				item.id_views.actions.forEach((el: fm_actions) => {
					actions.push({
						...el,
						id_views: vis,
					});
				});
		});

		//console.log('actions', actions);

		const permiss = await getRepository(fm_permissions).find({
			where: { id_rol, id_department: id_dep },
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
							view: action[j].id_views,
							name: action[j].name,
							description: action[j].description,
							status: perm[i].active ? true : false,
						});
					}
				}
				if (!flag) {
					list.push({
						id: action[j].id,
						name: action[j].name,
						description: action[j].description,
						view: action[j].id_views,
						status: false,
					});
				}
			}
			return list;
		};

		info = getListFormat(permiss, actions);

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

		//console.log(newAction);

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

			///console.log('existente', listUpdate);
			//console.log('crear', listSave);

			//if (listUpdate.length) await getRepository(fm_permissions).update(listUpdate, listUpdate);
			if (listSave.length) await getRepository(fm_permissions).save(listSave);
		};

		await saveListPermiss(perm, newAction);

		//console.log(perm);

		//logs
		const { id: id_user }: any = req.headers.token;
		await saveLogs(id_user, 'POST', req.url, `Cambio los permisos del departamento:${id_dep}/rol:${id_rol}`);

		Resp(req, res, { message: 'update permiss' });
	} catch (err) {
		next(err);
	}
};

export const getViews = async (
	req: Request<Api.params, Api.Resp, { id_dep: number }>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_dep }: any = req.params;

		const views = await getRepository(fm_views).find({ active: 1 });

		const access = await getRepository(fm_access_views).find({
			where: { id_department: id_dep },
			relations: ['id_views'],
		});

		const getListFormat = (item_access: any[], item_views: any[]) => {
			let list: any = [];
			for (let j = 0; j < item_views.length; j++) {
				let flag = false;
				for (let i = 0; i < item_access.length; i++) {
					if (item_views[j].id === item_access[i].id_views.id) {
						flag = true;
						list.push({
							id: item_views[j].id,
							name: item_views[j].name,
							status: item_access[i].active ? true : false,
						});
					}
				}
				if (!flag) {
					list.push({
						id: item_views[j].id,
						name: item_views[j].name,
						status: false,
					});
				}
			}
			return list;
		};

		//console.log('views', views);
		//console.log('access', access);

		const info = getListFormat(access, views);

		//console.log(info);

		const message: string = Msg('views').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const updateViews = async (
	req: Request<Api.params, Api.Resp, { id_dep: number }, any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_dep }: any = req.params;
		const newViews: any = req.body;

		const accessList = await getRepository(fm_access_views).find({
			where: { id_department: id_dep },
			relations: ['id_views'],
		});

		//console.log(newViews);

		const saveListViews = async (access: any[], views: any[]) => {
			let listSave: any[] = [];
			let listUpdate: any[] = [];
			for (let j = 0; j < views.length; j++) {
				let flag = false;
				for (let i = 0; i < access.length; i++) {
					if (views[j].id === access[i].id_views.id) {
						flag = true;
						listUpdate.push({
							id: access[i].id,
							id_deparment: id_dep,
							id_views: views[j].id,
							active: views[j].status ? 1 : 0,
						});
						await getRepository(fm_access_views).update(access[i].id, {
							active: views[j].status ? 1 : 0,
						});
					}
				}
				if (!flag) {
					if (views[j].status)
						listSave.push({
							id_department: id_dep,
							id_views: views[j].id,
							active: views[j].status ? 1 : 0,
						});
				}
			}

			//console.log('existente', listUpdate);
			//console.log('crear', listSave);

			//if (listUpdate.length) await getRepository(fm_permissions).update(listUpdate, listUpdate);
			if (listSave.length) await getRepository(fm_access_views).save(listSave);
		};

		await saveListViews(accessList, newViews);

		//logs
		const { id }: any = req.headers.token;
		await saveLogs(id, 'POST', req.url, `Cambio de vistas al dep: ${id_dep} `);

		Resp(req, res, { message: 'update views' });
	} catch (err) {
		next(err);
	}
};

export const updateDepartment = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { idDep }: any = req.headers.token;
		const ignore: string = idDep.name === 'God' ? '' : 'God';
		const { listDeps }: any = req.body;

		if (!listDeps || !listDeps.length)
			throw {
				message: 'No hay departmentos que editar',
			};

		listDeps.forEach(async (value: any) => {
			await getRepository(fm_department).update(value.id, { active: value.active });
		});

		//logs
		const { id: id_user }: any = req.headers.token;
		await saveLogs(id_user, 'POST', req.url, `Cambio el status de los departamentos`);

		const message: string = Msg('update Departments').getAll;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};

export const createDepartment = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { department }: any = req.body;

		if (!department)
			throw {
				message: 'No hay departmento a crear',
			};

		const newDep = await getRepository(fm_department).save({
			name: department,
		});

		const message: string = Msg('department creado').getAll;

		//logs
		const { id: id_user }: any = req.headers.token;
		await saveLogs(id_user, 'POST', req.url, `Creo el departamento:${department}`);

		Resp(req, res, { message, info: newDep });
	} catch (err) {
		next(err);
	}
};
