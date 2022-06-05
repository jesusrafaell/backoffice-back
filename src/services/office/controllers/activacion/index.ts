import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Api } from 'interfaces';
import Resp from '../../Middlewares/res';
import Msg from '../../../../hooks/messages/index.ts';
import axios from 'axios';

const HOST = 'http://localhost';
const PORT_PROVIDERS = 8000;

export const getAllTerminalsTMS7 = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.headers.token_text;
		console.log('login tms7');
		await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/auth/login`,
				{
					grant_type: 'password',
					username: 'acesso.teste',
					password: '@ger7123',
				},
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				throw { message: { text: 'Problemas de conexion con TMS7', provider: 'TMS7' } };
			});

		console.log('buscar terminales tms7');
		const resTms7 = await axios
			.get(`${HOST}:${PORT_PROVIDERS}/tms7/terminals`, { headers: { Authorization: token } })
			.catch((err) => {
				throw {
					message: {
						text: 'Error al buscar terminales en TMS7',
						provider: err?.response?.data?.message || 'Error Provider',
					},
				};
			});

		const info: any[] = resTms7.data.info;

		Resp(req, res, { message: Msg('terminals').getAll, info });
	} catch (err) {
		next(err);
	}
};

export const getAllCommercesTMS7 = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const token = req.headers.token_text;
		console.log('login tms7');
		await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/auth/login`,
				{
					grant_type: 'password',
					username: 'acesso.teste',
					password: '@ger7123',
				},
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				throw { message: { text: 'Problemas de conexion con TMS7', provider: 'TMS7' } };
			});

		console.log('buscar comercios tms7');
		const resTms7 = await axios
			.get(`${HOST}:${PORT_PROVIDERS}/tms7/commerces`, { headers: { Authorization: token } })
			.catch((err) => {
				throw {
					message: {
						text: 'Error al buscar comercios en TMS7',
						provider: err?.response?.data?.message || 'Error Provider',
					},
				};
			});

		const info: any[] = resTms7.data.info;

		Resp(req, res, { message: Msg('commerces').getAll, info });
	} catch (err) {
		next(err);
	}
};
