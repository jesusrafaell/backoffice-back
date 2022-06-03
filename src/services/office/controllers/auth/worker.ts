import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import { getConnection, getRepository, Not } from 'typeorm';
import fm_worker from '../../../../db/models/fm_worker';
import Msg from '../../../../hooks/messages/index.ts';
import { dataWorker, getPermiss, getViews } from './utils.ts';
import fm_permissions from '../../../../db/models/fm_permissions';
//import fm_views from '../../../../db/models/fm_views';
import fm_department from '../../../../db/models/fm_department';

export const worker = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id, idDep, idRol }: any = req.headers.token;
		console.log('worker', idDep, idRol);

		if (!id) {
			throw { mesage: 'Su usuario no existe' };
		}

		const resWorker = await getRepository(fm_worker).findOne({
			where: { id, id_department: idDep.id, id_rol: idRol.id },
			relations: ['id_rol', 'id_department', 'id_department.access_views', 'id_department.access_views.id_views'],
		});

		if (!resWorker) throw { message: 'Vuelva a iniciar sesión en el sistema', code: 401 };

		const { id_department, id_rol: rol, ...worker }: any = resWorker;
		const { access_views }: any = id_department;

		const views = getViews(access_views); //obtener lista de vistas

		let permiss: any = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss: any = await getRepository(fm_permissions).find({
				where: { id_department: idDep.id, id_rol: idRol.id, active: 1 },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = getPermiss(resPermiss);

			//console.log(permiss);
		} else {
			console.log('usuario base');
		}

		// extraemos data
		const { password, id: id_client, block, ...data_user }: any = worker;

		// Response
		Resp(req, res, {
			message: 'data del usuario',
			info: dataWorker(data_user, idDep, idRol, permiss, views),
		});
	} catch (err) {
		next(err);
	}
};

export const workerAll = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { idDep }: any = req.headers.token;
		//console.log(idDep);

		const idIgnore: any =
			idDep.name === 'God'
				? { id: 0, name: '' } //Si es god no ignores
				: await getRepository(fm_department).findOne({ where: { name: 'God' } }); //buscar el id god e ignoralo;

		const workers = await getRepository(fm_worker).find({
			where: { id_department: Not(idIgnore.id) },
		});

		const info: any[] = workers.map((worker: any) => {
			const { password, ...data }: any = worker;

			return data;
		});

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const getWorkerById = async (
	req: Request<Api.params, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.params;

		const worker = await getRepository(fm_worker).findOne({
			where: { id },
			relations: ['id_rol', 'id_department'],
		});
		const { password, ...data }: any = worker;

		const info = data;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const editWorkerById = async (
	req: Request<Api.params, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id } = req.params;
		const { id_rol, id_department, block } = req.body;
		const { idDep }: any = req.headers.token;

		console.log(idDep.name !== 'God');
		console.log(idDep.name !== 'Seguridad');
		if (idDep.name !== 'Seguridad' && idDep.name !== 'God') {
			throw { message: 'No tienes permisos para ejecutar esta acción' }; //Err[3312] //pasar a crear listas para las diferentes aciones
		}

		//console.log('dep', idDep);
		//console.log(id, id_rol, id_department, block);

		if (id && id_rol && id_department) {
			await getRepository(fm_worker).update(id, {
				id_rol,
				id_department,
				block,
			});
		} else {
			throw { message: 'Error al editar el usuario' };
		}
		const message: string = Msg('Usuario Editado').edit;

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
