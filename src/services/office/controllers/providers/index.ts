import axios, { AxiosResponse } from 'axios';
import fm_wallet_bank from '../../../../db/models/fm_wallet_bank';
import { getRepository } from 'typeorm';
import fm_client from '../../../../db/models/fm_client';
import fm_commerce from '../../../../db/models/fm_commerce';
import fm_request from '../../../../db/models/fm_request';
import res from 'services/Integration_providers/Middlewares/res';
import fm_posXcommerce from '../../../../db/models/fm_posXcommerce';
import Abonos from '../../../../db/models/Abonos';

const HOST = 'http://localhost';
const PORT_PROVIDERS = 8000;

export const comercioToProviders = async (idFm: any, token: any) => {
	//fatal revisar en 1000pagos cuando exista updatear commercio y contacto
	try {
		const FM: any = await getRepository(fm_request).findOne(idFm.id, {
			relations: [
				'id_valid_request',
				'pos',
				'pos.id_product',
				'id_client',
				'id_commerce',
				'id_commerce.id_ident_type',
				'pos',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
			],
		});
		if (!FM) throw { message: 'FM no existe call (Providers)' };
		const { pos, id_request_origin, ci_referred } = FM;
		const { id_product }: any = pos[0];
		const id_client = FM.id_client.id;
		const id_commerce = FM.id_commerce.id;

		console.log('Comenzar en 1000pagos', HOST, ' ', PORT_PROVIDERS);

		await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce`,
				{ id_fm: FM.id, id_commerce, id_client },
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				console.log('Error al crear comercio en 1000pagos');
				throw { message: 'Error al crear comercio en 1000pagos' };
			});

		console.log('comercio creado 1000pagos');

		if (id_product.id_intermediario === 1) {
			console.log('Comenzar en Tms7', HOST, ':', PORT_PROVIDERS);
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

			//Obtener el red de tms7 y el subacquier code
			let walletId: number = id_request_origin === 5 ? ci_referred : 1;
			//console.log('walletId buscar', walletId);
			const wallet: any = await getRepository(fm_wallet_bank).findOne({
				where: { id_cartera: walletId },
				relations: ['id_redes_tms7'],
			});
			if (!wallet) {
				throw { message: 'Error no se encontraron los parametros para TMS7' };
			}

			const redes_tms7 = wallet.id_redes_tms7;

			const { net_id } = redes_tms7;

			console.log('Data para tmst / nameBank:', wallet.name, ' /red ', redes_tms7);

			//TMS7
			await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce`,
					{ id_fm: FM.id, id_commerce, net_id },
					{ headers: { Authorization: token } }
				)
				.catch((err) => {
					throw {
						message: {
							text: 'Error al crear comercio en TMS7',
							provider: err?.response?.data?.message || 'Error Provider',
						},
					};
				});

			console.log('Comercio creado en TMS7');

			const resTerminalTms7 = await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce/terminal`,
					{ id_fm: FM.id, id_commerce, red: redes_tms7 },
					{ headers: { Authorization: token } }
				)
				.catch((err) => {
					console.log('Error al crear terminales ');
					throw { message: { text: 'Error al crear terminales en TMS7', provider: err?.response?.data?.message } };
				});

			console.log('Fin Ger7 terminales creadas', resTerminalTms7.data.terminales);

			let terminals = resTerminalTms7.data.terminales;

			const rif = FM.id_commerce.id_ident_type.name + FM.id_commerce.ident_num;

			console.log('Terminales creadads', terminals);
			console.log('Crear abono para ', rif);

			const resAbono: any = await createAbono1000pagos(FM.id_commerce, token, terminals);
			if (!resAbono.ok) {
				throw { message: 'Error al crear Abono o asignar planes en 1000pagos' };
			}

			//guardar nro_terminal in pos
			const { pos }: any = FM;
			let aux = 0;
			if (terminals.length) {
				terminals.map(async (terminal: any) => {
					for (let i = aux; i < pos.length; i++) {
						if (pos[i].active === 1 && pos[i].terminal === null) {
							await getRepository(fm_posXcommerce).update(pos[i].id, {
								terminal: terminal.terminalId,
							});
							aux = i + 1;
						}
					}
				});
			}
		} else if (id_product.id_intermediario === 2) {
			console.log('create in pagina de terminales');

			await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/app1000pagos/pagina_terminales`,
					{ id_fm: FM.id, id_commerce, id_client },
					{ headers: { Authorization: token } }
				)
				.catch((err) => {
					console.log('Error al crear terminal en pagina de terminales');
					throw { message: 'Error al crear terminal en pagina de terminales' };
				});

			console.log('creado en pagina de termianles');
		}

		//validate cliente y commerce

		if (FM.id_client.validate === 0) {
			await getRepository(fm_client).update(id_client, { validate: 1 });
		}
		if (FM.id_commerce.validate === 0) {
			await getRepository(fm_commerce).update(id_commerce, { validate: 1 });
		}

		return { ok: true };
	} catch (err: any) {
		console.log(err);
		const resErr = {
			err,
			message: err?.message,
			ok: false,
		};
		return resErr;
	}
};

const createAbono1000pagos = async (commerce: any, token: any, terminals: any) => {
	//console.log('teer', terminals);
	try {
		const res = await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/app1000pagos/abonoTms7`,
				{ commerce: commerce, terminals: terminals },
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				console.log('Error al crear abono en 1000pagos');
				throw { message: 'Error al crear abono en 1000pagos' };
			});
		return {
			ok: true,
			abonos: res.data.abonos,
		};
	} catch (err: any) {
		console.log(err);
		const resErr = {
			err,
			message: err?.message,
			ok: false,
		};
		return resErr;
	}
};

export const merchantCommerceTms7 = async (rif: string, token: any) => {
	try {
		await axios.post(
			`${HOST}:${PORT_PROVIDERS}/auth/login`,
			{
				grant_type: 'password',
				username: 'acesso.teste',
				password: '@ger7123',
			},
			{ headers: { Authorization: token } }
		);
		const res = await axios
			.get(`${HOST}:${PORT_PROVIDERS}/tms7/commerce/${rif}`, { headers: { Authorization: token } })
			.catch((err) => {
				console.log('Error al crear comercio');
				throw { message: 'Error al crear comercio en TMS7' };
			});
		console.log('mercaht res', res);
		return {
			ok: true,
			merchant: res,
		};
	} catch (err) {
		return {
			ok: false,
			err: err,
		};
	}
};

export const EditComercioToProviders = async (rif: string, id_commerce: number, token: any) => {
	try {
		console.log('Comenzar editcion en 1000pagos', HOST, ' ', PORT_PROVIDERS);

		await axios
			.put(
				`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce`,
				{ id_commerce, rif },
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				console.log('Error al editar comercio en 1000pagos');
				throw { message: 'Error al editar comercio en 1000pagos' };
			});

		console.log('comercio editado en 1000pagos');

		console.log('editar en Tms7', HOST, ':', PORT_PROVIDERS);
		await axios.post(
			`${HOST}:${PORT_PROVIDERS}/auth/login`,
			{
				grant_type: 'password',
				username: 'acesso.teste',
				password: '@ger7123',
			},
			{ headers: { Authorization: token } }
		);

		const commerceEditTms7: any = await axios
			.put(`${HOST}:${PORT_PROVIDERS}/tms7/commerce`, { id_commerce, rif }, { headers: { Authorization: token } })
			.catch((err) => {
				console.log('Error al  editar comercio');
				throw { message: 'Error al  editar comercio en TMS7' };
			});

		throw { message: 'Comercio editado en tms7 aun se trabaja' };

		return { ok: true };
	} catch (err: any) {
		console.log(err);
		const resErr = {
			err,
			message: err?.message,
			ok: false,
		};
		return resErr;
	}
};

export const comercio1000pagos = async (rif: string, id_commerce: number, token: any) => {
	try {
		await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce/exist`,
				{ id_commerce, rif },
				{ headers: { Authorization: token } }
			)
			.catch((err) => {
				console.log('Error al revisar el comercio en 1000pagos');
				throw { message: 'Error  al revisar el comercio en en 1000pagos' };
			});

		console.log('comercio editado en 1000pagos');

		return { ok: true };
	} catch (err: any) {
		console.log(err);
		const resErr = {
			err,
			message: err?.message,
			ok: false,
		};
		return resErr;
	}
};
