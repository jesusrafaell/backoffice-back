import { Response, Request, NextFunction } from 'express';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res/resp';
import { getRepository } from 'typeorm';
import fm_worker from '../../db/models/fm_worker';
import fm_roles from '../../db/models/fm_roles';

export const worker = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id, type }: any = req.headers.token;

		if (type === 1) throw { message: 'no esta tiene permiso de consumir enta data' };
		const worker = await getRepository(fm_worker).findOne(id);

		const { password, ...info }: any = worker;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const workerAll = async (req: Request<any, Api.Resp>, res: Response, next: NextFunction): Promise<void> => {
	try {
		const workers = await getRepository(fm_worker).find({ relations: ['roles'] });

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

		const worker = await getRepository(fm_worker).find({ where: { id }, relations: ['roles'] });
		const { password, ...data }: any = worker;

		const info = data;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const editWorkerById = async (
	req: Request<Api.params, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.params;

		const worker = await getRepository(fm_worker).find({ where: { id }, relations: ['roles'] });
		const { password, ...data }: any = worker;

		const info = data;

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};

export const workerByRol = async (
	req: Request<Api.params, Api.Resp>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.params;

		const info = await getRepository(fm_roles).find({ where: { id }, relations: ['workers'] });

		Resp(req, res, { message: 'data del usuario', info });
	} catch (err) {
		next(err);
	}
};
