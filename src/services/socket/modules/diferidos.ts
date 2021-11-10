import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository, Any, Not } from 'typeorm';

export let diferidos: any[] = [];
export let diferidosTranbajando: any[] = [];
export let solictudes: any[] = [];
export let solictudesTrabajando: any[] = [];

export const listdiferidos = async () => {
	const query = await getConnection()
		.query(/*sql*/ `SELECT r.id ,r.code, cc.name as nameComer, c.name as nameClient, c.last_name as lastnameClient, c.email , i.name as identTypeComer, cc.ident_num as identNumComer , r.updatedAt
			FROM [MilPagos].[dbo].[fm_status]

			inner join fm_request as r on r.id = id_request
			inner join fm_client as c on c.id = r.id_client
			inner join fm_commerce as cc on cc.id = r.id_commerce
			inner join fm_ident_type as i on i.id = cc.id_ident_type

			where id_department = 1 and id_status_request = 4`);

	diferidos = query;
	// diferidoss = query.map((item) => item.id_request);

	return diferidos;
};

export const onediferidos = async (id_request: any) => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	if (diferidos.length <= 5) {
		const query = await getRepository(fm_status).findOne({
			where: { id_request },
			relations: [
				'id_request',
				'id_request.id_client',
				'id_request.id_client.id_ident_type',
				'id_request.id_valid_request',
				'id_request.rc_constitutive_act',
				'id_request.rc_special_contributor',
				'id_request.rc_ref_bank',
				'id_request.rc_comp_dep',
				'id_request.rc_rif',
				'id_request.rc_ident_card',
			],
		});

		if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

		diferidosTranbajando.push(query.id_request);

		return diferidosTranbajando;
	}
};

export const listSolicWorking = async (id_conectado: any, user: any) => {
	console.log('solictudes.length', solictudes.length);
	if (solictudes.length < 3) await listSolic();
	if (solictudes.length !== 0) {
		const obj = solictudesTrabajando.find((items) => items.id_conectado === id_conectado);
		if (obj) return obj;

		console.log('solictudes', solictudes.length);

		const working = solictudes.shift();

		console.log('solictudes pos', solictudes.length);

		// working.id_conectado = id_conectado;
		// working.id_user = user.id;
		// working.email_user = user.email;
		// working.last_user = user.last_name;
		// working.name_user = user.name;

		// solictudesTrabajando.unshift(working);
		solictudesTrabajando.unshift({ id_conectado, ...user, working });
		// const obj2 = solictudesTrabajando.find((items) => items.id_conectado === id_conectado);
		console.log(working);
		return working;
	}
};

export const disconect = (id_sockect: any) => {
	console.log('antes del filter ', solictudesTrabajando.length);
	console.log('solictudes', solictudes.length);

	solictudesTrabajando = solictudesTrabajando
		.filter((item) => {
			console.log('item.id_conectado != id_sockect');
			console.log(`${item.id_conectado} != ${id_sockect}`);
			console.log(item.id_conectado != id_sockect);

			if (item.id_conectado != id_sockect) return true;

			solictudes.unshift(item);
			return false;
		})
		.map((item) => item.working);

	console.log('pos del filter ', solictudesTrabajando.length);
	console.log('pos solictudes', solictudes.length);
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
		where: { id_status_request: 1, id_department: 1, id_request: Not(ids) },
		take: 10,
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
			'id_request.id_client.id_ident_type',
			'id_request.id_valid_request',
			'id_request.dir_pos',
			'id_request.dir_pos.id_location',
			'id_request.rc_constitutive_act',
			'id_request.rc_special_contributor',
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
			'id_request.rc_rif',
			'id_request.rc_ident_card',
			'id_request.id_payment_method',
			'id_request.id_type_payment',
			'id_request.id_commerce',
			'id_request.id_commerce.id_ident_type',
			'id_request.id_commerce.id_activity',
			'id_request.id_commerce.id_location',
			'id_request.id_commerce.id_location.id_estado',
			'id_request.id_commerce.id_location.id_municipio',
			'id_request.id_commerce.id_location.id_ciudad',
			'id_request.id_commerce.id_location.id_parroquia',
			'id_request.id_commerce.banks',
			'id_request.id_product',
			'id_request.id_type_request',
			'id_request.id_request_origin',
		],
	});

	if (!query) throw { message: 'no existen solicitudes en espera', code: 400 };

	const info: any = query.map((item) => item.id_request);

	solictudes.push(info);
	// diferidoss = query.map((item) => item.id_request);

	return solictudes;
};

export const getdiferidos = async (id_request: number) => {
	let query: any = await getRepository(fm_status).findOne({
		where: { id_request },
		relations: [
			'id_request',
			'id_request.id_valid_request',
			'id_request.rc_constitutive_act',
			'id_request.rc_special_contributor',
			'id_request.rc_ref_bank',
			'id_request.rc_comp_dep',
			'id_request.rc_rif',
			'id_request.rc_ident_card',
		],
	});

	if (!query) throw { message: 'el id soministrado no extie', code: 400 };

	let id_valid_request: any = {};
	Object.keys(query.id_request.id_valid_request)
		.filter((key) => {
			return query.id_request.id_valid_request[key].length;
		})
		.forEach((key) => (id_valid_request[key] = query.id_request.id_valid_request[key]));

	let imgs: any = {};

	Object.keys(id_valid_request)
		.map((valid) => valid.replace('valid_', 'rc_'))
		.forEach((key) => (imgs[key] = query.id_request[key]));

	const resp = {
		...imgs,
		id_valid_request,
	};

	// console.log('resp', resp);

	return resp;
};

export const getDash = async (id_request: number) => ({
	solictudes,
	solictudesTrabajando,
	diferidos,
	diferidosTranbajando,
});
