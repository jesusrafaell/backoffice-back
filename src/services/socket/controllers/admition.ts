import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository, Any, Not, In, EntityRepository } from 'typeorm';
import fm_request from '../../../db/models/fm_request';
import fm_client from '../../../db/models/fm_client';

export let allSolic: number = 0;
export let allTerm: any = 0;
export let diferido: any[] = [];
export let diferidoTranbajando: any[] = [];
export let solictudes: any[] = [];
export let solictudesTrabajando: any[] = [];
export let solicitudColeada: any[] = [];

export const listDiferido = async () => {
	const ids = diferidoTranbajando.map((item) => item.id);
	const query = await getConnection()
		.query(/*sql*/ `SELECT r.id ,r.code, cc.name as nameComer, c.name as nameClient, c.last_name as lastnameClient, c.email , i.name as identTypeComer, cc.ident_num as identNumComer , r.updatedAt
			FROM [MilPagos].[dbo].[fm_status]

			inner join fm_request as r on r.id = id_request
			inner join fm_client as c on c.id = r.id_client
			inner join fm_commerce as cc on cc.id = r.id_commerce
			inner join fm_ident_type as i on i.id = cc.id_ident_type

			where id_department = 4 and id_status_request = 4 ${
				ids.length ? `AND id_request NOT IN (${ids.join(', ')})` : ``
			} `);

	diferido = query;
	// diferidos = query.map((item) => item.id_request);

	return diferido;
};

export const oneDIferido = async (id_request: any) => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	// if (diferido.length <= 5) {
	if (allSolic == 0) throw { message: 'no existen solicitudes en espera', code: 400 };
	else {
		let ids = [
			...solictudes.map((solictude) => solictude.id),
			...solictudesTrabajando.map((solictude) => solictude.id),
		];

		const query = await getRepository(fm_status).findOne({
			where: { id_request, id: Not(In(ids)) },
			relations: [
				'id_request',
				'id_request.id_client',
				'id_request.id_client.id_ident_type',
				'id_request.id_client.rc_ident_card',
				'id_request.id_commerce',
				'id_request.id_commerce.rc_constitutive_act',
				'id_request.id_commerce.rc_constitutive_act.id_photo',
				'id_request.id_commerce.rc_special_contributor',
				'id_request.id_commerce.rc_rif',
				'id_request.id_commerce.id_aci',
				'id_request.rc_ref_bank',
				'id_request.id_valid_request',
				'id_request.rc_comp_dep',
			],
		});

		if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

		diferidoTranbajando.push(query.id_request);

		return diferidoTranbajando;
	}

	// }
};

export const listSolicWorking = async (id_conectado: any, user: any) => {
	try {
		await listSolic();
		const obj = solictudesTrabajando.find((items) => {
			return items.id_conectado === id_conectado && items.ident_num === user.ident_num;
		});

		if (obj) return solictudesTrabajando.find((items) => items.ident_num === user.ident_num);

		if (solictudes.length === 0 || allSolic === 0)
			return { message: 'no existen solicitudes en espera', code: 400 };

		const itemNew: any = solictudes
			.filter((value) => solictudesTrabajando.filter((item) => item.code === value.code).length < 1)
			.shift();

		if (!itemNew) return { message: 'no existen solicitudes en espera', code: 400 };

		solictudesTrabajando.unshift({ id_conectado, ...user, ...itemNew });

		return itemNew;
	} catch (err) {
		console.log(err);
	}
};

export const listDiferidoWorking = async (id_conectado: any, user: any, id_dife: any) => {
	// console.log('diferido pre', diferido);
	// console.log('Id_Sockect ', id_conectado);
	// console.log('User ', user);
	// console.log('Id ', id_dife);

	const obj = diferidoTranbajando.find((items) => {
		// console.log(`items.id_conectado === id_conectado`, items.id_conectado === id_conectado);

		return items.id_conectado === id_conectado || items.id === user.id;
	});
	// console.log('Obj', obj);
	if (obj) return obj;
	if (diferido.length > 0) {
		const i = diferido.findIndex((item) => {
			return item.id == id_dife;
		});
		// console.log('Valor I', i);
		if (i == -1) {
			return; // // console.log('MENOL NO EXISTE');
		}
		// const working2 = diferido.find((item) => {
		// 	return item.id === id_dife;
		// });

		const resp = diferido[i];

		// console.log('DIferido pos', resp);

		diferido.splice(i, 1);

		//// // console.log('Lista de Diferidos', diferido);

		// diferidoTranbajando.unshift({ id_conectado, ...user, ...working2 });
		diferidoTranbajando.unshift({ id_conectado, ...user, ...resp });

		// console.log('diferido pos', diferido);
		// console.log('diferido pos', diferidoTranbajando);
		//
		return resp;
	}
};

export const disconect = async (id_sockect: any) => {
	// console.log('id_Socket del disconec ', id_sockect);

	// console.log('Solicitudes Trabajando ', solictudesTrabajando);
	try {
		solictudesTrabajando = solictudesTrabajando.filter((item) => {
			if (item.id_conectado != id_sockect) return true;

			const { id_conectado, email, last_name, name, ...working } = item;

			solictudes.filter((items) => {
				if (items.id == working.id) {
					solictudes.shift();
				}
				return false;
			});
			// console.log('Disconec linpia', working);
			solictudes.unshift(working);

			return false;
		});

		diferidoTranbajando = diferidoTranbajando.filter((item) => {
			if (item.id_conectado != id_sockect) return true;

			const { id_conectado, email, last_name, name, ...working } = item;

			diferido.unshift(working);

			return false;
		});
	} catch (err) {
		console.log(err);
	}

	// console.log('Solicitudes Activas ', solictudes);

	// console.log('soy trabajando ', diferido);
};

export const disconectsolic = async (id_sockect: any) => {
	solictudesTrabajando = solictudesTrabajando.filter((item) => item.id_conectado != id_sockect);

	diferidoTranbajando = diferidoTranbajando.filter((item) => item.id_conectado != id_sockect);
};

export const listSolic = async () => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );

	let ids = [
		...solictudes.map((solictude) => solictude.id),
		...solictudesTrabajando.map((solictude) => solictude.id),
	];

	const query = await getRepository(fm_status).find({
		where: { id_status_request: 1, id_department: 4, id: Not(In(ids)) },
		take: 50,
		order: {
			id: 'ASC',
		},
		relations: [
			'id_request',
			'id_request.id_client',
			'id_request.id_client.id_location',
			'id_request.id_client.id_location.id_estado',
			'id_request.id_client.id_location.id_municipio',
			'id_request.id_client.id_location.id_ciudad',
			'id_request.id_client.id_location.id_parroquia',
			'id_request.id_client.rc_ident_card',
			'id_request.id_client.id_ident_type',
			//
			'id_request.rc_planilla',
			'id_request.rc_planilla.id_photo',
			'id_request.id_valid_request',
			'id_request.pos',
			'id_request.pos.id_location',
			'id_request.pos.id_location.id_estado',
			'id_request.pos.id_location.id_municipio',
			'id_request.pos.id_location.id_ciudad',
			'id_request.pos.id_location.id_parroquia',
			//
			'id_request.id_commerce',
			'id_request.id_commerce.id_ident_type',
			'id_request.id_commerce.id_activity',
			'id_request.id_commerce.id_location',
			'id_request.id_commerce.id_location.id_estado',
			'id_request.id_commerce.id_location.id_municipio',
			'id_request.id_commerce.id_location.id_ciudad',
			'id_request.id_commerce.id_location.id_parroquia',
			'id_request.id_commerce.banks',
			'id_request.id_commerce.rc_constitutive_act',
			'id_request.id_commerce.rc_constitutive_act.id_photo',
			'id_request.id_commerce.rc_rif',
			'id_request.id_commerce.rc_special_contributor',
			'id_request.id_commerce.id_aci',
			//
			'id_request.id_product',
			'id_request.id_type_request',
			'id_request.id_request_origin',
			//
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
			'id_request.id_payment_method',
			'id_request.id_type_payment',
		],
	});

	// console.log('Query para SOlicitud', query);

	if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

	const info: any = query.map((item) => item.id_request);

	solictudes = info;
	// diferidos = query.map((item) => item.id_request);

	// console.log('Lista de solicitudes', solictudes);

	return solictudes;
};

export const getDiferido = async (id_request: number) => {
	let query: any = await getRepository(fm_status).findOne({
		where: { id_request },
		relations: [
			'id_request',
			'id_request.id_valid_request',
			'id_request.id_commerce',
			'id_request.rc_planilla',
			'id_request.rc_planilla.id_photo',
			'id_request.id_commerce.rc_constitutive_act',
			'id_request.id_commerce.rc_constitutive_act.id_photo',
			'id_request.id_commerce.rc_rif',
			'id_request.id_commerce.rc_special_contributor',
			'id_request.id_commerce.id_aci',
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
			'id_request.id_client',
			'id_request.id_client.rc_ident_card',
		],
	});

	if (!query) throw { message: 'el id soministrado no extie', code: 400 };

	console.log('diferidos', query);

	/*

	let id_valid_request: any = {};
	Object.keys(query.id_request.id_valid_request)
		.filter((key) => {
			return query.id_request.id_valid_request[key].length;
		})
		.forEach((key) => (id_valid_request[key] = query.id_request.id_valid_request[key]));

	const { id_commerce, id_client, rc_ref_bank, rc_comp_dep, rc_planilla }: any = query.id_request;
	// console.log('id_commerce', id_commerce);

	const { rc_special_contributor, rc_constitutive_act, rc_rif }: any = id_commerce;
	const { rc_ident_card }: any = id_client;

	*/

	/*
	let imgs: any = {};

	const data: any = {
		rc_planilla,
		rc_special_contributor,
		rc_constitutive_act,
		rc_rif,
		rc_ident_card,
		rc_ref_bank,
		rc_comp_dep,
	};
	Object.keys(id_valid_request)
		.map((valid) => valid.replace('valid_', 'rc_'))
		.forEach((key) => (imgs[key] = data[key]));
	*/
	/*

	const resp = {
		...imgs,
		id_valid_request,
	};
	*/

	// console.log('resp', resp);

	return query;
};

export const getDash = () => ({
	solictudes: solictudes.length,
	solictudesTrabajando: solictudesTrabajando.length,
	diferidos: diferido.length,
	diferidosTranbajando: diferidoTranbajando.length,
});

export const All_Info = async () => {
	let solicitudes = await getRepository(fm_status).count({
		where: { id_status_request: 1, id_department: 4 },
	});

	let terminadas: any = await getRepository(fm_status).count({
		where: { id_status_request: 3, id_department: 4 },
	});

	let diferidos: any = await getRepository(fm_status).count({
		where: { id_status_request: 4, id_department: 4 },
	});

	// getDash();

	allSolic = solicitudes;
	allTerm = terminadas;

	const total = { allSolic, allTerm, diferidos };

	//// // console.log(total);

	return total;
};

export const OneSolic = async (key: any) => {
	try {
		// const query = await getConnection().query(
		// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
		// );
		console.log('KEY:', key);

		const client = await getRepository(fm_client).findOne({
			where: { ident_num: key },
			relations: ['requests'],
		});
		if (!client) throw { message: 'la cedula suministrada no existe', code: 400 };

		return client;
	} catch (err) {
		console.log('err', err);
	}
};

export const colearOneSolic = async (key: any) => {
	try {
		// const query = await getConnection().query(
		// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
		// );
		console.log('KEY:', key);

		const client = await getRepository(fm_client).findOne({
			where: { ident_num: key },
			relations: ['requests'],
		});
		if (!client) throw { message: 'la cedula suministrada no existe', code: 400 };

		// console.log('client', client);

		const ids_request = client.requests ? client.requests.map((id_request: any) => id_request.id) : [];
		// console.log('ids_request', ids_request);

		const query = await getRepository(fm_status).find({
			where: { id_status_request: 1, id_department: 4, id_request: In(ids_request) },
			relations: [
				'id_request',
				'id_request.id_client',
				'id_request.id_client.id_location',
				'id_request.id_client.id_location.id_estado',
				'id_request.id_client.id_location.id_municipio',
				'id_request.id_client.id_location.id_ciudad',
				'id_request.id_client.id_location.id_parroquia',
				'id_request.id_client.rc_ident_card',
				'id_request.id_client.id_ident_type',
				//
				'id_request.id_valid_request',
				'id_request.pos',
				'id_request.pos.id_location',
				'id_request.pos.id_location.id_estado',
				'id_request.pos.id_location.id_municipio',
				'id_request.pos.id_location.id_ciudad',
				'id_request.pos.id_location.id_parroquia',
				//
				'id_request.id_commerce',
				'id_request.id_commerce.id_ident_type',
				'id_request.id_commerce.id_activity',
				'id_request.id_commerce.id_location',
				'id_request.id_commerce.id_location.id_estado',
				'id_request.id_commerce.id_location.id_municipio',
				'id_request.id_commerce.id_location.id_ciudad',
				'id_request.id_commerce.id_location.id_parroquia',
				'id_request.id_commerce.banks',
				'id_request.id_commerce.rc_constitutive_act',
				'id_request.id_commerce.rc_constitutive_act.id_photo',
				'id_request.id_commerce.rc_rif',
				'id_request.id_commerce.rc_special_contributor',
				'id_request.id_commerce.id_aci',
				//
				'id_request.id_product',
				'id_request.id_type_request',
				'id_request.id_request_origin',
				//
				'id_request.rc_ref_bank',
				'id_request.rc_comp_dep',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
			],
		});

		if (!query.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		// diferidos = query.map((item) => item.id_request);
		query.forEach((item) => solictudes.unshift(item));
		// solictudes.unshift(info);
	} catch (err) {
		console.log('err', err);
	}
};
