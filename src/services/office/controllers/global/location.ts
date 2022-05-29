import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import { getRepository } from 'typeorm';
//import Resp from '../../Middlewares/res';
import fm_direccion from '../../../../db/models/fm_direccion';

export const getDireccionesEstado = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_direccion)
			.createQueryBuilder('estados')
			.select('estado')
			.distinct(true)
			.orderBy('estado')
			.getRawMany();

		res.status(200).json({ message: 'lista de direcciones', info });
	} catch (err) {
		next(err);
	}
};

export const getDireccionesMunicipio = async (
	req: Request<Api.Resp | any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { estado } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_direccion)
			.createQueryBuilder('direccion')
			.select('municipio')
			.where({ estado })
			.distinct(true)
			.orderBy('municipio')
			.getRawMany();

		res.status(200).json({ message: 'lista de municipios', info });
	} catch (err) {
		next(err);
	}
};

export const getDireccionesCiudad = async (
	req: Request<Api.Resp | any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { estado, municipio } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_direccion)
			.createQueryBuilder('direccion')
			.select('ciudad')
			.where({ estado, municipio })
			.distinct(true)
			.orderBy('ciudad')
			.getRawMany();

		//console.log(info);
		res.status(200).json({ message: 'lista de ciudades', info });
	} catch (err) {
		next(err);
	}
};

export const getDireccionesParroquia = async (
	req: Request<Api.Resp | any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { estado, municipio, ciudad } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_direccion)
			.createQueryBuilder('direccion')
			.select('parroquia')
			.where({ estado, municipio, ciudad })
			.distinct(true)
			.orderBy('parroquia')
			.getRawMany();

		res.status(200).json({ message: 'lista de parroquias', info });
	} catch (err) {
		next(err);
	}
};

export const getDireccionesSector = async (
	req: Request<Api.Resp | any>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { estado, municipio, ciudad, parroquia } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_direccion)
			.createQueryBuilder('direccion')
			.select('sector,id,codigoPostal')
			.where({ estado, municipio, ciudad, parroquia })
			.distinct(true)
			.orderBy('sector')
			.getRawMany();

		res.status(200).json({ message: 'lista de sectores', info });
	} catch (err) {
		next(err);
	}
};
