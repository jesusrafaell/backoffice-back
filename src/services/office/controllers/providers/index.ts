import axios from 'axios';
import fm_client from '../../../../db/models/fm_client';
import fm_commerce from '../../../../db/models/fm_commerce';
import { getRepository } from 'typeorm';
const HOST = 'http://localhost';
const PORT_PROVIDERS = 8000;

export const comercioToProviders = async (FM: any, token: any) => {
	try {
		const { id_product } = FM;
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

		if (id_product.id === 1) {
			console.log('Comenzar en Tms7', HOST, ':', PORT_PROVIDERS);
			await axios.post(
				`${HOST}:${PORT_PROVIDERS}/auth/login`,
				{
					grant_type: 'password',
					username: 'acesso.teste',
					password: '@ger7123',
				},
				{ headers: { Authorization: token } }
			);

			console.log('bug1');

			//TMS7
			const resCommerce = await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce`,
					{ id_fm: FM.id, id_commerce, id_client },
					{ headers: { Authorization: token } }
				)
				.catch((err) => {
					console.log('Error al crear comercio');
					throw { message: 'Error al crear comercio en TMS7' };
				});

			console.log('Comercio creado en TMS7');

			const resTerminalTms7 = await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce/terminal`,
					{ id_fm: FM.id, id_commerce, id_client },
					{ headers: { Authorization: token } }
				)
				.catch((err) => {
					console.log('Error al crear terminales ');
					throw { message: 'Error al crear terminales en TMS7' };
				});

			console.log('Fin Ger7 terminales creadas', resTerminalTms7.data.terminales);

			let terminals = resTerminalTms7.data.terminales;

			const rif = FM.id_commerce.id_ident_type.name + FM.id_commerce.ident_num;

			console.log('Terminales creadads', terminals);
			console.log('Crear abono para ', rif);

			const resAbono: any = await createAbono1000pagos(FM.id_commerce, token, terminals);
			if (!resAbono.ok) {
				throw { message: 'Error al crear Abono en 1000pagos' };
			}
			console.log('Abono creado en 1000pagos');
		} else if (id_product.id === 2) {
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

			/*
			await getRepository(fm_worker)
				.createQueryBuilder()
				.update(fm_worker)
				.set({ block: 0 })
				.where('email = :email', { email })
				.execute();
				*/
			//throw { message: 'pagina de terminales' };
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
