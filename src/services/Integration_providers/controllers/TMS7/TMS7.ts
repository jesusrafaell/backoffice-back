import axios from 'axios';
import { NextFunction, Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import createMerchantId from '../../../../utilis/createMerchantId';
import fm_request from '../../../../db/models/fm_request';
import { Api } from '../../../../interfaces';
import fm_commerce from '../../../../db/models/fm_commerce';
import { createTerminalTms7 } from './utilis/terminals';
import { createCommerceTMS7, getMerchanId, updateCommerceTMS7 } from './utilis/commerce';
import fm_redes_tms7 from '../../../../db/models/fm_redes_tms7';

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

		res.status(200).json({ message: 'Auth OK', ok: true });
	} catch (err) {
		console.log('err', err);

		const resErr = {
			ok: false,
			err,
		};

		next(resErr);
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

const validCommerceTms7 = async (commerce: any, net_id: number, access_token: string): Promise<boolean | any> => {
	try {
		const comercio = await axios.get(
			`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=${net_id}&taxId=${commerce.taxId}`,
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
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; net_id: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('Crear comercio TMS7');
		const { token }: any = req.headers;
		const { net_id } = req.body;

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_direccion',
				'id_client.id_ident_type',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
				'id_commerce.id_location',
				'id_commerce.id_location.id_direccion',
				//pos
				'pos',
				'pos.id_location',
				'pos.id_location.id_direccion',
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };

		const { id_commerce, id_client, pos, id }: any = fmData;
		const { name, id_ident_type, ident_num, id_activity }: any = id_commerce;
		const { estado, codigoPostal } = id_commerce.id_location.id_direccion;

		//commerce
		const dirCC = id_commerce.id_location.id_direccion;
		const address = `${dirCC.estado}, ${dirCC.municipio}, ${dirCC.ciudad}, ${dirCC.parroquia}, ${dirCC.sector}; ${id_commerce.id_location.calle}, ${id_commerce.id_location.local}`;

		//cliente
		const dirC = id_client.id_location.id_direccion;
		const address_line1 = `${dirC.estado}`;

		//Pos
		const dirPos = pos[0].id_location.id_direccion;
		const address_line2 = `${dirPos.estado}`;

		//console.log('Comercio activad_afiliado:', id_commerce.id_activity.id_afiliado.id);

		//el codigo de afiliacion, id del comercio en 1000pagos
		const merchantId = createMerchantId(id_commerce.id_activity.id_afiliado.id, id_commerce.codComer_1000pagos);

		const commerce = {
			net_id,
			subacquirer_code: `0${id_commerce.id_activity.id_afiliado.id}`,
			merchantId,
			company_name: name,
			receipt_name: name,
			trade_name: name,
			taxId: `${id_ident_type.name}${ident_num}`,
			address,
			address_number: 100,
			address_line1, //Maximo de 15 char Aproxidamente
			address_line2, //Maximo de 15 char Aproxidamente
			city: dirCC.ciudad,
			state: estado,
			postalcode: codigoPostal,
			status: 1,
			group: {
				//[3312 falta cambiar esto que se base solo en la activiad afiliado]
				//name: net_id === 2 ? `${id_activity.id_afiliado.name}` : 'backoffico',
				name: id_activity.id,
				//installments: '1',
			},
			partner: null,
		};

		const resValidCommerceTsm7 = await validCommerceTms7(commerce, net_id, usar.access_token);
		if (resValidCommerceTsm7) {
			console.log('Comercio ya existe en TMS7 ');
		} else {
			console.log('Crear comercio en TMS7 --> ');
			const saveComercioTMS7 = await createCommerceTMS7(commerce, usar.access_token);
			if (saveComercioTMS7) {
				console.log('mandar', saveComercioTMS7?.data?.Message);
				throw {
					message:
						saveComercioTMS7?.data?.Message || saveComercioTMS7?.message || 'Error en crear comercio en TMS7',
				};
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
	const { rif, net_id }: any = req.params;
	console.log('buscar este ', rif);
	try {
		console.log('Get Terminales from ', rif);
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const merchant: any = await getMerchanId(rif, net_id, usar.access_token);
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
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; red: any }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token }: any = req.headers;
		const { net_id } = req.body.red;
		const { red } = req.body;
		console.log('crear terminal en tms7');

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const fm = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce },
			relations: [
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
			],
		});
		if (!fm) throw { message: 'el comercio suministrado no existe', code: 400 };

		const { id_commerce, number_post }: any = fm;
		const { id_ident_type, ident_num }: any = id_commerce;

		const merchant: any = await getMerchanId(`${id_ident_type.name}${ident_num}`, net_id, usar.access_token);
		if (!merchant.ok) {
			console.log('El comercio no tiene merchatId');
			throw { message: 'El comercio no esta registrado en TMS7 no se pudo crear terminales' };
		}

		//new terminls
		console.log(merchant.merchantId);

		//console.log('red', red);

		const terminal = {
			net_id: red.net_id,
			merchantId: merchant.merchantId,
			parametrizationName: red.parametrization,
			parametrizationVersion: red.version,
			status: 7, //activo: 1, //inactivo: 2, nuevo: 7
		};

		console.log('terminal:', terminal);

		let terminales: any = [];

		for (let i = 0; i < number_post; i++) {
			console.log('Terminal: ' + (i + 1) + ' creada para', id_commerce.name, ' en el net_id: ', red.net_id);
			const saveTerminalTms7 = await createTerminalTms7(terminal, usar.access_token);
			if (saveTerminalTms7.ok) {
				terminales.push(saveTerminalTms7.terminal);
			} else {
				throw { message: saveTerminalTms7?.message || 'Error en crear Terminal en TMS7' };
			}
		}

		console.log('terminales creadas', terminales);

		res.status(200).json({ message: 'Terminales creadas', terminales });
	} catch (err) {
		next(err);
	}
};

export const getCommerceTms7 = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { rif, net_id }: any = req.params;
	console.log('buscar este ', rif);
	try {
		console.log('llegue ', rif);
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);

		const merchant: any = await getMerchanId(rif, net_id, usar.access_token);
		if (!merchant.ok) {
			console.log('Comercio no esta en TMS7', rif);
			throw { message: 'Comercio no esta en TMS7', ok: false };
		}

		const info = {
			ok: true,
			merchant: merchant.merchantId,
		};

		res.status(200).json({ message: 'Auth OK', info });
	} catch (err) {
		next(err);
	}
};

export const editCommerceTMS7 = async (
	req: Request<Api.params, Api.Resp, { id_commerce: number; rif: string; net_id: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token }: any = req.headers;
		const { net_id } = req.body;

		const usar = users.find((user) => user.id === token.id);
		if (!usar) throw { message: 'usuario no logeado', code: 401 };

		const id_commerce: number = req.body.id_commerce;
		const rif: string = req.body.rif;
		const commerce: any = await getRepository(fm_commerce).findOne(id_commerce, {
			relations: [
				'id_ident_type',
				'id_activity',
				'id_activity.id_afiliado',
				'id_location',
				'id_location.id_direccion',
			],
		});
		if (!commerce) throw { message: 'el commercio suministrado no existe', code: 400 };

		const merchant: any = await getMerchanId(rif, net_id, usar.access_token);
		if (merchant.ok && merchant.data) {
			const { id_location } = commerce;
			const { name, id_ident_type, ident_num, id_activity }: any = commerce;
			const { estado, codigoPostal } = id_location.id_direccion;
			const dirCC = id_location.id_direccion;

			const address = `${dirCC.estado}, ${dirCC.municipio}, ${dirCC.ciudad}, ${dirCC.parroquia}, ${dirCC.sector}; ${id_location.calle}, ${id_location.local}`;

			if (id_activity.id_afiliado.name !== merchant.data.group.name) {
				console.log(id_activity.id_afiliado.name, id_activity.id_afiliado.name.length);
				console.log(merchant.data.group.name, merchant.data.group.name.length);
				console.log('TMS7 no permite editar el Grupo del comercio');
				//throw { message: 'TMS7 no permite editar el Grupo del comercio' };
			} else {
				const newDataCommerce = {
					...merchant.data,
					company_name: name,
					receipt_name: name,
					trade_name: name,
					taxId: `${id_ident_type.name}${ident_num}`,
					address,
					city: dirCC.ciudad,
					state: estado,
					postalcode: codigoPostal,
					status: 1,
					subacquirer_code: `0${id_activity.id_afiliado.id}`,
					//Tiene error el endpoint cuando mando group
					/*
			group: {
				name: id_activity.id_afiliado.name,
				installments: merchant.data.group.installments,
			},
			*/
				};

				console.log('send data', newDataCommerce);

				const resUpdateTms7 = await updateCommerceTMS7(newDataCommerce, usar.access_token);
				if (!resUpdateTms7.ok) {
					throw { message: resUpdateTms7?.message || 'Error en editar comercio en TMS7' };
				}

				console.log('comercio updatated en tms7');
			}
		} else {
			console.log('Comercio no esta en TMS7');
		}

		res.status(200).json({ message: 'Comercio editado en TMS7' });
	} catch (err) {
		console.log('Error al editar comercio en tms7');
		next(err);
	}
};

export const getAllTerminals = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('buscar terminales');
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };
		const net_ids = await getRepository(fm_redes_tms7).find();

		let listTerminals: any[] = [];

		let routes: string[] = [];

		net_ids.map((net: fm_redes_tms7) => {
			routes.push(`${process.env.HOST_TMS7}/TMS7API/v1/Terminal?net_id=${net.net_id}`);
		});

		console.log('routas', routes);

		const getListTerminals: any = await multiGetterAxios(routes, usar.access_token)
			.then((responses) => {
				return {
					ok: true,
					responses,
				};
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
				throw { message: 'Error al buscar teminales en las redes de tms7' };
			});

		net_ids.map((net: fm_redes_tms7, index: number) => {
			console.log('Terminales:', getListTerminals.responses[index].data.terminals.length, 'en la red', net.net_id);
			listTerminals = listTerminals.concat(getListTerminals.responses[index].data.terminals);
		});

		console.log('Total terminales', listTerminals.length);

		res.status(200).json({ message: 'Lista de Terminales', info: listTerminals });
	} catch (err) {
		next(err);
	}
};

export const getAllCommerces = async (
	req: Request<any, Api.Resp, any>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('buscar terminales');
		const { id }: any = req.headers.token;

		const usar = users.find((user) => user.id === id);
		// if (!usar) throw { message: 'usuario no logeado', code: 401 };
		const net_ids = await getRepository(fm_redes_tms7).find();

		let listCommerces: any[] = [];

		let routes: string[] = [];

		net_ids.map((net: fm_redes_tms7) => {
			routes.push(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=${net.net_id}`);
		});

		console.log('routas', routes);

		const getListCommerces: any = await multiGetterAxios(routes, usar.access_token)
			.then((responses) => {
				return {
					ok: true,
					responses,
				};
			})
			.catch((errors) => {
				console.log('error multi axos', errors);
				throw { message: 'Error al buscar comercios en las redes de tms7' };
			});

		net_ids.map((net: fm_redes_tms7, index: number) => {
			console.log('Comercios:', getListCommerces.responses[index].data.merchants.length, 'en la red', net.net_id);
			listCommerces = listCommerces.concat(getListCommerces.responses[index].data.merchants);
		});

		console.log('Total comercios', listCommerces.length);

		res.status(200).json({ message: 'Lista de comercios', info: listCommerces });
	} catch (err) {
		next(err);
	}
};

export const multiGetterAxios = async (routes: string[], token: string) => {
	try {
		const stop = routes.map(async (route: string) => {
			return await axios.get(route, {
				baseURL: process.env.REACT_APP_API_API,
				headers: {
					Authorization: 'Bearer ' + token,
				},
			});
		});

		const resps = await Promise.all(stop);

		return resps;
	} catch (err) {
		console.error('en getters', err);

		return [];
	}
};
