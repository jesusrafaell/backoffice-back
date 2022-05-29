import { NextFunction, Request, Response } from 'express';
import { getRepository, Not } from 'typeorm';
import fm_ident_type from '../../../../db/models/fm_ident_type';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import { Api } from 'interfaces';
import fm_activity from '../../../../db/models/fm_activity';
import fm_status_request from '../../../../db/models/fm_status_request';
import fm_company from '../../../../db/models/fm_company';
import fm_department from '../../../../db/models/fm_department';
import fm_type_request from '../../../../db/models/fm_type_request';
import Cartera from '../../../../db/models/Cartera';
import fm_telemercadeo from '../../../../db/models/fm_telemercadeo';
import fm_type_payment from '../../../../db/models/fm_type_payment';
import fm_request_origin from '../../../../db/models/fm_request_origin';
import Aliados from '../../../../db/models/Aliados';
import fm_type_diferido from '../../../../db/models/fm_type_diferido';
import fm_wallet_bank from '../../../../db/models/fm_wallet_bank';

export const getAllIdent_type = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_ident_type).find();

		const message: string = Msg('identidad').getAll;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllActivity = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_activity).find({ relations: ['id_afiliado'] });

		const message: string = Msg('Actividade').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllStatus = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_status_request).find();

		const message: string = Msg('Status').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllCompanys = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_company).find();

		const message: string = Msg('compañia').getAll;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllTypeSolicts = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_type_request).find();

		const message: string = Msg('type_solict').getAll;

		res.status(200).json({ message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllDeparments = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const { idDep }: any = req.headers.token;
		//console.log(idDep);

		const idIgnore: any =
			idDep.name === 'God'
				? { id: 0, name: '' } //Si es god no ignores
				: await getRepository(fm_department).findOne({ where: { name: 'God' } }); //buscar el id god e ignoralo;

		const info = await getRepository(fm_department).find({
			where: { name: Not(idIgnore.name) },
		});

		const message: string = Msg('departamento').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllBanks = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_wallet_bank).find();

		const message: string = Msg('Bancos (Carteras)').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllTeleMarket = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_telemercadeo).find();

		const message: string = Msg('telemercadeo').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllTypePayment = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_type_payment).find();

		const message: string = Msg('type_payment').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllRequestSource = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_request_origin).find();

		const message: string = Msg('request_source').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAlldistribuidores = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(Aliados).find({
			where: {
				aliIdUsuario: 2,
			},
		});

		const message: string = Msg('request_source').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllAcis_Distribudores = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(Aliados).find();

		const message: string = Msg('request_source').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};

export const getAllTypesDiferidos = async (
	req: Request<any, any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const info = await getRepository(fm_type_diferido).find();

		const message: string = Msg('type_diferidos').getAll;

		Resp(req, res, { message, info });
	} catch (err) {
		next(err);
	}
};
