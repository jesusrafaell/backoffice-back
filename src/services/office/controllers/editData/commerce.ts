import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { getRepository } from 'typeorm';
import fm_commerce from '../../../../db/models/fm_commerce';
import { comercioToProviders } from '../providers';

export const getAllCommercesValidated = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const commerces = await getRepository(fm_commerce).find({
			order: { id: 'ASC' },
			relations: [
				'id_ident_type',
				'id_activity',
				'id_location',
				'id_location.id_direccion',
				'banks',
				'rc_constitutive_act',
				'rc_constitutive_act.id_photo',
				'rc_rif',
				'rc_special_contributor',
				'id_aci',
			],
		});

		if (!commerces.length) throw { message: 'No hay comercios registrados', code: 400 };

		console.log(commerces[0].updatedAt);

		const info = commerces;

		Resp(req, res, { message: Msg('commerces').getAll, info });
	} catch (err) {
		next(err);
	}
};

export const updateCommerce = async (req: Request<any>, res: Response, next: NextFunction): Promise<void> => {
	try {
		// validacion de data
		//validationResult(req).throw();

		if (!req.body.commerce) throw { message: 'falta data del comercio' };
		const commerce = JSON.parse(req.body.commerce);
		const files: any = req.files;

		const oldCommerce = await getRepository(fm_commerce).findOne({
			where: { id: commerce.id },
			relations: [
				'id_ident_type',
				'id_activity',
				'id_location',
				'id_location.id_direccion',
				'banks',
				'rc_constitutive_act',
				'rc_constitutive_act.id_photo',
				'rc_rif',
				'rc_special_contributor',
				'id_aci',
			],
		});

		//console.log(commerce);
		//console.log(files);

		//Solo comercio
		//add list de comparaciones
		if (commerce !== oldCommerce) {
			console.log('editar comercio');
		}

		if (!commerce) throw { message: 'No hay comercios registrados [BO]', code: 400 };

		throw { message: 'ok vamos con edit commerce' };

		Resp(req, res, { message: 'update ok' });
	} catch (err) {
		next(err);
	}
};
