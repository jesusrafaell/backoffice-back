import { NextFunction, Request, Response } from 'express';
import { Api } from 'interfaces';
import { getRepository } from 'typeorm';
import fm_estado from '../../../../db/models/fm_estado';
import Resp from '../../Middlewares/res';
import fm_municipio from '../../../../db/models/fm_municipio';
import fm_parroquia from '../../../../db/models/fm_parroquia';
import fm_ciudad from '../../../../db/models/fm_ciudad';
import fm_direccion from '../../../../db/models/fm_direccion';

export const getEstados = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_estado).find();

		Resp(req, res, { message: 'lista de estados', info });
	} catch (err) {
		next(err);
	}
};

export const getMunicipiosByEstado = async (
	req: Request<Api.pMunicipio, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_estado } = req.params;
		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_municipio).find({ where: { id_estado } });

		Resp(req, res, { message: 'lista de parroquias', info });
	} catch (err) {
		next(err);
	}
};

export const getParroquiasByMunicipio = async (
	req: Request<Api.pParroquia, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_municipio } = req.params;

		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_parroquia).find({ where: { id_municipio } });

		Resp(req, res, { message: 'lista de municipios', info });
	} catch (err) {
		next(err);
	}
};

export const getCiudadByEstado = async (
	req: Request<Api.pCiudad, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_estado } = req.params;

		// getter list of estados to db ith typeorm
		const info = await getRepository(fm_ciudad).find({ where: { id_estado } });

		Resp(req, res, { message: 'lista de ciudad', info });
	} catch (err) {
		next(err);
	}
};

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
			.getRawMany();

		Resp(req, res, { message: 'lista de direcciones', info });
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
			.getRawMany();

		Resp(req, res, { message: 'lista de municipios', info });
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
			.getRawMany();

		//console.log(info);
		Resp(req, res, { message: 'lista de ciudades', info });
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
			.getRawMany();

		Resp(req, res, { message: 'lista de parroquias', info });
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
			.getRawMany();

		Resp(req, res, { message: 'lista de sectores', info });
	} catch (err) {
		next(err);
	}
};
