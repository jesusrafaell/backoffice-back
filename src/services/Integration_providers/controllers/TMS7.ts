import axios from 'axios';
import { NextFunction, Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import { createMerchantId } from '../../../utilis/createMerchantId';
import fm_request from '../../../db/models/fm_request';
import { Api } from '../../../interfaces';

let users: any[] = [];

interface tms7Auth {
	grant_type?: 'password';
	username: string;
	password: string;
}

export const Login = async (
	req: Request<any, Api.Resp, tms7Auth>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const bodyTMS7 = new URLSearchParams();

		const { body }: any = req;

		req.body.grant_type = 'password';

		Object.keys(req.body).forEach((key: any) => bodyTMS7.append(key, body[key]));

		const resp = await axios.post(`${process.env.HOST_TMS7}/auth/token`, bodyTMS7, {
			headers: {
				Connection: 'keep-alive',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const { token }: any = req.headers;
		const { access_token } = resp.data;

		const i = users.findIndex((user) => user.id === token.id);

		if (i >= 0) users[i].access_token = resp.data.access_token;
		else users.push({ id: token.id, access_token });

		res.status(200).json({ message: 'Auth OK' });
	} catch (err) {
		console.log('err', err);

		next(err);
	}
};

export const getAllCommerce = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const resp = await axios.get(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=0002`, {
			headers: {
				Authorization: 'Bearer ' + usar.access_token,
			},
		});

		res.status(200).json({ message: 'Auth OK', info: resp.data });
	} catch (err) {
		next(err);
	}
};

const validarRif_tms7 = async (rif: string, access_token: string): Promise<boolean> => {
	try {
		await axios.get(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=2&taxId=${rif}`, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return true;
	} catch (err) {
		let error: any = err;

		console.log(error);

		return false;
	}
};

const createCommerceTMS7 = async (commerce: any, access_token: string): Promise<boolean | any> => {
	try {
		await axios.post(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant`, commerce, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return null;
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			data: err?.response.data,
		};
		console.log('Tms7 error ', resError);
		return resError;
	}
};

const validCommerceTms7 = async (commerce: any, access_token: string): Promise<boolean | any> => {
	try {
		const comercio = await axios.get(
			`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=${commerce.net_id}&taxId=${commerce.taxId}`,
			{
				headers: {
					Authorization: 'Bearer ' + access_token,
				},
			}
		);
		return comercio;
	} catch (err: any) {
		//console.log('Comercio no existe en tms7');
		return null;
	}
};

export const createCommerce = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token }: any = req.headers;

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce, id_client: req.body.id_client },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_estado',
				'id_client.id_location.id_municipio',
				'id_client.id_location.id_ciudad',
				'id_client.id_location.id_parroquia',
				'id_client.id_ident_type',
				//pos
				'pos',
				'pos.id_location',
				'pos.id_location.id_estado',
				'pos.id_location.id_municipio',
				'pos.id_location.id_ciudad',
				'pos.id_location.id_parroquia',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
				'id_commerce.id_location',
				'id_commerce.id_location.id_estado',
				'id_commerce.id_location.id_municipio',
				'id_commerce.id_location.id_ciudad',
				'id_commerce.id_location.id_parroquia',
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };

		const { id_commerce, id_client, pos, id }: any = fmData;
		const { name, id_ident_type, ident_num, id_activity }: any = id_commerce;
		const { id_estado, id_ciudad } = id_commerce.id_location;

		const address = Object.keys(id_commerce.id_location)
			.filter((key) => key !== 'id')
			.map((key) => id_commerce.id_location[key][key.replace('id_', '')])
			.filter((item) => item)
			.join(', ');

		const address_line1 = Object.keys(id_client.id_location)
			.filter((key) => key !== 'id')
			.map((key) => id_client.id_location[key][key.replace('id_', '')])
			.filter((item) => item)[0];

		const address_line2 = Object.keys(pos[0].id_location)
			.map((key) => pos[0].id_location[key][key.replace('id_', '')])
			.filter((item) => item)[0];

		const merchantId = createMerchantId(id_activity.id_afiliado.id, id);

		const commerce = {
			net_id: 2,
			subacquirer_code: `0${id_activity.id_afiliado.id}`,
			merchantId,
			company_name: name,
			receipt_name: name,
			trade_name: name,
			taxId: `${id_ident_type.name}${ident_num}`,
			address,
			address_number: 100,
			address_line1,
			address_line2,
			city: id_client.name,
			state: id_estado.estado,
			postalcode: id_ciudad.postal_code,
			status: 1,
			group: { name: `${id_activity.id_afiliado.name}`, installments: '1' },
			partner: null,
		};

		const resValidCommerceTsm7 = await validCommerceTms7(commerce, usar.access_token);
		if (resValidCommerceTsm7) {
			console.log('Comercio ya existe en TMS7 ');
		} else {
			console.log('Crear comercio en TMS7 --> ', commerce);
			const saveComercioTMS7 = await createCommerceTMS7(commerce, usar.access_token);
			if (saveComercioTMS7) {
				throw { message: saveComercioTMS7?.message || 'Error en crear comercio en TMS7' };
			}
		}

		res.status(200).json({ message: 'Comercio creado' });
	} catch (err) {
		next(err);
	}
};

export const getCommerceTerminals = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { rif }: any = req.params;
	console.log('buscar este ', rif);
	try {
		console.log('llegue ', rif);
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const merchant: any = await getMerchanId(rif, usar.access_token);
		if (!merchant.ok) {
			console.log('Comercio no esta en TMS7');
			throw { message: 'Comercio no esta en TMS7' };
		}

		const terminales: any = await axios.get(
			`${process.env.HOST_TMS7}/TMS7API/v1/Terminal?net_id=2&merchantId=${merchant.merchantId}`,
			{
				headers: {
					Authorization: 'Bearer ' + usar.access_token,
				},
			}
		);

		console.log(terminales.data.terminals);
		console.log('tsm7 ' + merchant.merchantId + ' term' + terminales.data.terminals.length);

		res.status(200).json({ message: 'Auth OK', terminals: terminales.data.terminals });
	} catch (err) {
		next(err);
	}
};

export const createTerminal = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token }: any = req.headers;
		console.log('crear terminal en tms7');

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce, id_client: req.body.id_client },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_ident_type',
				//pos
				'pos',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };

		const { id_commerce, id, number_post }: any = fmData;
		const { id_ident_type, ident_num, id_activity }: any = id_commerce;

		const merchant: any = await getMerchanId(`${id_ident_type.name}${ident_num}`, usar.access_token);
		if (!merchant.ok) {
			console.log('Tiene merchan en tms7');
		}

		const merchantId2 = createMerchantId(id_activity.id_afiliado.id, id);

		console.log(merchant.merchantId, merchantId2);

		const terminal = {
			net_id: 2,
			merchantId: merchantId2,
			parametrizationName: 'IP publico - Pruebas GER7',
			parametrizationVersion: 12,
			status: 7,
		};

		console.log('terminal:', terminal);

		for (let i = 0; i < number_post; i++) {
			console.log('Terminal: ' + (i + 1) + 'creada para', id_commerce.name);
			const saveTermianlTms7 = await createTerminalTms7(terminal, usar.access_token);
			if (saveTermianlTms7) {
				throw { message: saveTermianlTms7?.message || 'Error en crear Terminal en TMS7' };
			}
		}

		res.status(200).json({ message: 'Terminales creadas' });
	} catch (err) {
		next(err);
	}
};

const createTerminalTms7 = async (terminal: any, access_token: string): Promise<boolean | any> => {
	try {
		const res: any = await axios.post(`${process.env.HOST_TMS7}/TMS7API/v1/Terminal`, terminal, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		//console.log('terminal', res);
		return null;
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			extra: err?.response.Message,
		};
		console.log('Tms7 error ', resError);
		return resError;
	}
};

const getMerchanId = async (taxId: string, access_token: string): Promise<boolean | any> => {
	try {
		const res: any = await axios.get(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=2&taxId=${taxId}`, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		const merchantId = res.data.merchants[0].merchantId;
		return {
			merchantId,
			ok: true,
		};
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			ok: false,
		};
		console.log('Tms7 error ', resError);
		return resError;
	}
};
