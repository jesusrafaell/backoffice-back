import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { getRepository } from 'typeorm';
import fm_commerce from '../../../../db/models/fm_commerce';
import Comercios from '../../../../db/models/Comercios';
import ident_type from '../../../../db/contents/ident_type';
import fm_location from '../../../../db/models/fm_location';
import { EditComercioToProviders } from '../providers';

export const getAllCommercesValidated = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		/*
		const commerceBO = await getRepository(fm_commerce).find({
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
		*/

		const commerceBO_1000pagos = await getRepository(fm_commerce)
			.createQueryBuilder('cc')
			.innerJoinAndSelect('cc.id_ident_type', 'identC')
			.innerJoinAndSelect(
				Comercios,
				'ccMil',
				'ccMil.comerRif = CONCAT(identC.name, cc.ident_num) AND ccMil.comerRif IS NOT NULL'
			)
			.orderBy('cc.id', 'ASC')
			.leftJoinAndSelect('cc.rc_rif', 'rc_rif')
			.innerJoinAndSelect('cc.id_activity', 'activity')
			.leftJoinAndSelect('cc.id_location', 'location')
			.innerJoinAndSelect('location.id_direccion', 'direccion')
			.select([
				'cc.id as id',
				'cc.name as nameComerce',
				'identC.id as id_ident_type',
				'identC.name as id_ident_type_name',
				'cc.ident_num as ident_num_commerce',
				'rc_rif.path as rc_rif',
				//'activity.id',
				//'activity.name',
				//'activity.id_afiliado as activity_id_afiliado',
				//'location.id_direccion as id_direccion',
				'direccion.estado',
				//'direccion.municipio',
				//'direccion.ciudad',
				//'direccion.parroquia',
				//'direccion.sector',
				//'direccion.codigoPostal',
				//'location.calle',
				//'location.local',
				//'cc.days as days',
				'cc.validate as validate',
				'cc.updatedAt as updatedAt',
			])
			.getRawMany();

		//.leftJoinAndSelect('cc.id_ident_type', 'ident_type')

		//console.log('query', commerceBO_1000pagos);

		if (!commerceBO_1000pagos.length) throw { message: 'No hay comercios registrados', code: 400 };

		const info = commerceBO_1000pagos;

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

		if (!oldCommerce) throw { message: 'No existe este comercio [BO]', code: 400 };

		const {
			id_ident_type,
			id_activity,
			id_location,
			banks,
			rc_constitutive_act,
			rc_rif,
			rc_special_contributor,
			id_aci,
			...dataOldCommerce
		}: any = oldCommerce;

		//change change if ident_num
		if (commerce.id_ident_type !== id_ident_type.id || commerce.ident_num !== oldCommerce?.ident_num) {
			console.log('se edito un campo peligroso');
		}

		let flagEdit: boolean = false;

		const { location } = commerce;
		console.log(location.id_direccion, id_location.id_direccion.id);
		console.log(
			location.id_direccion !== id_location.id_direccion.id,
			location.calle !== id_location.calle,
			location.local !== id_location.local
		);
		if (location) {
			if (
				location.id_direccion !== id_location.id_direccion.id ||
				location.calle !== id_location.calle ||
				location.local !== id_location.local
			) {
				await getRepository(fm_location).update(id_location.id, location);
				flagEdit = true;
				console.log('updated location from commerce idLocation: ', id_location.id);
			}
		}

		if (
			(commerce.name && oldCommerce.name !== commerce.name) ||
			(commerce.id_ident_type && id_ident_type.id !== commerce.id_ident_type) ||
			(commerce.ident_num && oldCommerce.ident_num !== commerce.ident_num) ||
			(commerce.special_contributor && oldCommerce.special_contributor !== commerce.special_contributor) ||
			(commerce.id_activity && id_activity.id !== commerce.id_activity) ||
			(commerce.days && oldCommerce.days !== commerce.days)
		) {
			const newDataCommerce = await getRepository(fm_commerce).update(
				{ id: commerce.id },
				{
					name: commerce.name || oldCommerce.name,
					id_ident_type: commerce.id_ident_type || id_ident_type.id,
					ident_num: commerce.ident_num || oldCommerce?.ident_num,
					special_contributor:
						commerce.special_contributor !== null
							? commerce.special_contributor
							: oldCommerce?.special_contributor,
					id_activity: commerce.id_activity || oldCommerce?.id_activity,
					days: commerce.days || oldCommerce?.days,
				}
			);
			flagEdit = true;
		}

		const oldRif = `${id_ident_type.name}${oldCommerce.ident_num}`;

		if (flagEdit) {
			console.log('Comercio', commerce.id, 'fue editada su informacion en [BO]');
			//modificar en tms7
			const resProviders: any = await EditComercioToProviders(oldRif, commerce.id, req.headers.token_text);
			if (!resProviders.ok) {
				throw { message: resProviders.message || 'Error en API Providers' };
			}
		}

		throw { message: 'ok vamos con edit commerce' };

		Resp(req, res, { message: 'update ok' });
	} catch (err) {
		next(err);
	}
};

export const getDataCommerce = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp | any>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_commerce }: any = req.params;

		const commerce = await getRepository(fm_commerce).findOne({
			where: { id: id_commerce },
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

		//'esta en tsm7'?

		if (!commerce) throw { message: 'Este comercio no esta registrado', code: 400 };

		const id_ident_type: any = commerce.id_ident_type;

		const rif: string = `${id_ident_type.name}${commerce.ident_num}`;
		console.log('rif bus', rif);

		//Esta en TMS7?
		/*
		const resProviders: any = await merchantCommerceTms7(`${rif}`, req.headers.token_text);
		if (!resProviders.ok) {
			throw { message: resProviders.message || 'Error en API Providers' };
		}
		*/

		const info = {
			...commerce,
		};

		Resp(req, res, { message: 'data del comercio', info });
	} catch (err) {
		next(err);
	}
};
