import axios from 'axios';
const HOST = 'http://localhost';
const PORT_PROVIDERS = 8000;

export const comercioToProviders = async (FM: any, token: any) => {
	try {
		const { id_product } = FM;

		console.log('Comenzar en 1000pagos', HOST, ' ', PORT_PROVIDERS);

		await axios
			.post(
				`${HOST}:${PORT_PROVIDERS}/app1000pagos/commerce`,
				{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
				{ headers: { token: token } }
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
				{ headers: { token: token } }
			);

			console.log('bug1');

			//TMS7
			const resCommerce = await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce`,
					{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
					{ headers: { token: token } }
				)
				.catch((err) => {
					console.log('Error al crear comercio');
					throw { message: 'Error al crear comercio en TMS7' };
				});

			console.log('Comercio creado en TMS7');

			const resTerminalTms7 = await axios
				.post(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce/terminal`,
					{ id_fm: FM.id, id_commerce: FM.id_commerce, id_client: FM.id_client },
					{ headers: { token: token } }
				)
				.catch((err) => {
					console.log('Error al crear terminales ');
					throw { message: 'Error al crear terminales en TMS7' };
				});

			console.log('Fin Ger7 terminales creadas', resTerminalTms7.data.terminales);

			let terminals = resTerminalTms7.data.terminales;

			const rif = FM.id_commerce.id_ident_type.name + FM.id_commerce.ident_num;

			console.log('Crear abono para ', rif);

			/*
			const terminalsTms7 = await axios
				.get(
					`${HOST}:${PORT_PROVIDERS}/tms7/commerce/terminals/${rif}`,
					{ headers: { token: token } }
					//{ headers: { token: token } }
				)
				.catch((err) => {
					console.log('Error al buscar terminales del comercio');
					throw { message: 'Error al buscar terminales en tms7' };
				});

			//console.log('terminales', terminalsTms7.data.terminals);
			terminals = terminalsTms7.data.terminals;
			*/

			const resAbono: any = await createAbono1000pagos(FM.id_commerce, token, terminals);
			if (!resAbono.ok) {
				throw { message: 'Error al crear Abono en 1000pagos' };
			}
			console.log('Abono creado en 1000pagos');
		} else if (id_product.id === 2) {
			console.log('create in pagina de temrianles');
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
				{ headers: { token: token } }
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
