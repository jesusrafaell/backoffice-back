import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../interfaces';
import axios from 'axios';
import { getRepository } from 'typeorm';
import fm_commerce from '../../../db/models/fm_commerce';
import fm_request from '../../../db/models/fm_request';
import ident_type from '../../../db/contents/ident_type';
let token: string = '';

let users: any[] = [];

// const axios = Axios.create({
// 	baseURL: 'http://10.198.72.86',
// 	timeout: 1000,
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 	},
// });

interface tms7Auth {
	grant_type?: 'password';
	username: string;
	password: string;
}

interface tms7Commerce {}

export const Login = async (
	req: Request<any, Api.Resp, tms7Auth>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('body', req.body);

		const bodyTMS7 = new URLSearchParams();

		const { body }: any = req;

		req.body.grant_type = 'password';

		Object.keys(req.body).forEach((key: any) => bodyTMS7.append(key, body[key]));

		const resp = await axios.post('http://10.198.72.86/auth/token', bodyTMS7, {
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
		console.log('req.headers.token', req.headers.token);

		const { id }: any = req.headers.token;

		console.log('users', users);

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		console.log('usar', usar);

		console.log('');

		const resp = await axios.get('http://10.198.72.86/TMS7API/v1/Merchant?net_id=0002', {
			headers: {
				Authorization: 'Bearer ' + usar.access_token,
			},
		});

		res.status(200).json({ message: 'Auth OK', info: resp.data });
	} catch (err) {
		next(err);
	}
};

export const createCommerce = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('req.headers.token', req.headers.token);

		const { id }: any = req.headers.token;

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
				// dir_pos
				'dir_pos',
				'dir_pos.id_location',
				'dir_pos.id_location.id_estado',
				'dir_pos.id_location.id_municipio',
				'dir_pos.id_location.id_ciudad',
				'dir_pos.id_location.id_parroquia',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_location',
				'id_commerce.id_location.id_estado',
				'id_commerce.id_location.id_municipio',
				'id_commerce.id_location.id_ciudad',
				'id_commerce.id_location.id_parroquia',
				'id_commerce.banks',
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };

		const { id_commerce, id_client, dir_pos }: any = fmData;
		const { name, id_ident_type, ident_num, id_activity }: any = id_commerce;

		const { id_estado, id_ciudad } = id_commerce.id_location;

		const address = Object.keys(id_commerce.id_location)
			.map((key) => id_commerce.id_location[key].name)
			.join(', ');

		const address_line1 = Object.keys(id_client.id_location)
			.map((key) => id_client.id_location[key].name)
			.join(', ');

		const address_line2 = Object.keys(dir_pos.id_location)
			.map((key) => dir_pos.id_location[key].name)
			.join(', ');

		const commerce = {
			net_id: 2,
			subacquirer_code: id_activity.id_afiliados,
			merchantId: '0720004108',
			company_name: name,
			receipt_name: name,
			trade_name: name,
			taxId: `${id_ident_type}${ident_num}`,
			address,
			address_number: 100,
			address_line1,
			address_line2,
			city: id_ciudad.name,
			state: id_estado.name,
			postalcode: id_ciudad.postal_code,
			status: '1',
			group: { name: id_activity.id, installments: '1' },
			partner: { code: null },
		};

		console.log('users', users);

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		console.log('usar', usar);

		console.log('');

		const valid = await axios.get(
			`http://10.198.72.86/TMS7API/v1/Merchant?net_id=2&taxId=${id_ident_type}${ident_num}`,
			{
				headers: {
					Authorization: 'Bearer ' + usar.access_token,
				},
			}
		);

		const resp = await axios.post('http://10.198.72.86/TMS7API/v1/Merchant', commerce, {
			headers: {
				Authorization: 'Bearer ' + usar.access_token,
			},
		});

		res.status(200).json({ message: 'Auth OK', info: resp.data });
	} catch (err) {
		next(err);
	}
};
