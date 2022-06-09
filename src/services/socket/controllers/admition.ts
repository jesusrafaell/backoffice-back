import fm_status from '../../../db/models/fm_status';
import { getConnection, getRepository, Any, Not, In, EntityRepository } from 'typeorm';
import fm_request from '../../../db/models/fm_request';
import fm_client from '../../../db/models/fm_client';
import { relationsFM } from '../utilis/relationsFM';
import fm_commerce from '../../../db/models/fm_commerce';
import fm_ident_type from '../../../db/models/fm_ident_type';
import { takeCoverage } from 'v8';

export let allSolic: number = 0;
export let allTerm: any = 0;
export let diferido: any[] = [];
export let diferidoTranbajando: any[] = [];
export let solicitudes: any[] = [];
export let solicitudesTrabajando: any[] = [];
export let solicitudColeada: any[] = [];

export const listDiferido = async () => {
	try {
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
	} catch (err) {
		console.log('err', err);
	}
};

export const oneDIferido = async (id_request: any) => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	// if (diferido.length <= 5) {
	try {
		if (allSolic == 0) throw { message: 'no existen solicitudes en espera', code: 400 };
		else {
			let ids = [
				...solicitudes.map((solictude) => solictude.id),
				...solicitudesTrabajando.map((solictude) => solictude.id),
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
	} catch (err) {
		console.log('err', err);
	}

	// }
};

export const listSolicWorking = async (id_conectado: any, user: any) => {
	try {
		await listSolic();
		const obj = solicitudesTrabajando.find((items) => {
			return items.id_conectado === id_conectado && items.ident_num === user.ident_num;
		});

		if (obj) return solicitudesTrabajando.find((items) => items.ident_num === user.ident_num);

		if (solicitudes.length === 0 || allSolic === 0)
			return { message: 'no existen solicitudes en espera', code: 400 };

		const itemNew: any = solicitudes
			.filter((value) => solicitudesTrabajando.filter((item) => item.code === value.code).length < 1)
			.shift();

		if (!itemNew) return { message: 'no existen solicitudes en espera', code: 400 };

		solicitudesTrabajando.unshift({ id_conectado, ...user, ...itemNew });

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
	try {
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
	} catch (err) {
		console.log('err', err);
	}
};

export const disconect = async (id_sockect: any) => {
	// console.log('id_Socket del disconec ', id_sockect);

	// console.log('Solicitudes Trabajando ', solicitudesTrabajando);
	try {
		solicitudesTrabajando = solicitudesTrabajando.filter((item) => {
			if (item.id_conectado != id_sockect) return true;

			const { id_conectado, email, last_name, name, ...working } = item;

			solicitudes.filter((items) => {
				if (items.id == working.id) {
					solicitudes.shift();
				}
				return false;
			});
			// console.log('Disconec linpia', working);
			solicitudes.unshift(working);

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

	// console.log('Solicitudes Activas ', solicitudes);

	// console.log('soy trabajando ', diferido);
};

export const disconectsolic = async (id_sockect: any) => {
	solicitudesTrabajando = solicitudesTrabajando.filter((item) => item.id_conectado != id_sockect);

	diferidoTranbajando = diferidoTranbajando.filter((item) => item.id_conectado != id_sockect);
};

export const listSolic = async () => {
	// const query = await getConnection().query(
	// 	/*sql*/ `SELECT * FROM [MilPagos].[dbo].[fm_status] where id_department = 1 and id_status_request = 1`
	// );
	try {
		let ids = [
			...solicitudes.map((solictude) => solictude.id),
			...solicitudesTrabajando.map((solictude) => solictude.id),
		];

		const query: any = await getRepository(fm_status).find({
			where: { id_status_request: 1, id_department: 4, id: Not(In(ids)) },
			take: 50,
			order: {
				id: 'ASC',
			},
			relations: relationsFM,
		});

		if (!query) throw { message: 'No existen solicitudes en espera', code: 400 };

		const info: any = query.map((item: any) => item.id_request);

		const info2: any = query.map((item: any) => item.id_request.id);

		console.log('En esperax', info2);

		solicitudes = info;

		return solicitudes;
	} catch (err) {
		console.log('err', err);
	}
};

export const getDiferido = async (id_request: number) => {
	try {
		let query: any = await getRepository(fm_status).findOne({
			where: { id_request },
			relations: relationsFM,
		});

		const { rc_planilla } = query.id_request;

		if (rc_planilla) {
			let auxPlanilla: any[] = [];
			for (let i = 0; i < rc_planilla.length; ++i) {
				if (rc_planilla[i].id_photo.id_status === 1) {
					//console.log(rc_planilla[i], rc_planilla[i].id_photo.id_status);
					auxPlanilla.push(rc_planilla[i]);
				}
			}
		}

		const { rc_constitutive_act } = query.id_request.id_commerce;
		if (rc_constitutive_act) {
			let auxActa: any[] = [];
			for (let i = 0; i < rc_constitutive_act.length; ++i) {
				if (rc_constitutive_act[i].id_photo.id_status === 1) {
					//console.log(rc_constitutive_act[i], rc_constitutive_act[i].id_photo.id_status);
					auxActa.push(rc_constitutive_act[i]);
				}
				query.id_request.id_commerce.rc_constitutive_act = auxActa;
			}
		}

		if (!query) throw { message: 'el id soministrado no extie', code: 400 };

		//console.log('diferidos', query);

		return query;
	} catch (err) {
		console.log('err', err);
	}
};

export const getDash = () => ({
	solicitudes: solicitudes.length,
	solicitudesTrabajando: solicitudesTrabajando.length,
	diferidos: diferido.length,
	diferidosTranbajando: diferidoTranbajando.length,
});

export const All_Info = async () => {
	try {
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
	} catch (err) {
		console.log('err', err);
	}
};

export const OneSolicCommerce = async (key: any) => {
	try {
		console.log('KEY:', key);

		console.log('xd', (key as string).toUpperCase());

		const ident: string = key[0].toUpperCase();
		const ident_num: string = key.slice(1);

		console.log('ident', ident);
		console.log('num', key.slice(1));

		const identType = await getRepository(fm_ident_type).findOne({
			where: { name: ident },
		});
		if (!identType) throw { message: 'El tipo de documento de identidad es invalido', code: 400 };

		console.log('buscar', identType.id, ident_num);

		const commerce = await getRepository(fm_commerce).findOne({
			where: { ident_num, id_ident_type: identType.id },
		});
		if (!commerce) throw { message: 'El comercio no existe', code: 400 };

		const solic = await getRepository(fm_request)
			.createQueryBuilder('fm')
			.where(`fm.id_commerce = ${commerce.id}`)
			.innerJoinAndSelect(
				fm_status,
				'status',
				`status.id_request = fm.id AND status.id_department = 4 AND status.id_status_request = 1`
			)
			.select('Top (1) fm.id as id')
			.getRawOne();

		console.log('solic', solic);

		if (!solic) throw { message: 'Este comercio no tiene solicitudes en espera', code: 400 };

		solicitudesTrabajando.forEach((item: any) => {
			if (item.id === solic.id) {
				throw { message: 'La solicitud del comercio se esta validando', code: 400 };
			}
		});

		return {
			ok: true,
			solic,
		};
	} catch (err) {
		return {
			ok: false,
			err,
		};
	}
};

export const OneSolic = async (key: any) => {
	try {
		console.log('KEY:', key);

		const solic = await getRepository(fm_request).findOne({
			where: { code: key },
		});
		if (!solic) throw { message: 'La solicitud no existe', code: 400 };

		const solicStatus = await getRepository(fm_status).findOne({
			where: { id_request: solic.id, id_department: 4, id_status_request: 1 },
		});
		if (!solicStatus) throw { message: 'La solicitud no esta en espera', code: 400 };

		solicitudesTrabajando.forEach((item: any) => {
			if (item.id === solic.id) {
				throw { message: 'La solicitud del comercio se esta validando', code: 400 };
			}
		});

		return {
			ok: true,
			solic,
		};
	} catch (err) {
		return {
			ok: false,
			err,
		};
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
				'pos.',
				'pos.id_product',
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
		query.forEach((item) => solicitudes.unshift(item));
		// solicitudes.unshift(info);
	} catch (err) {
		console.log('err', err);
	}
};

export const moveSolicWorking = async (id_conectado: any, user: any, solic: any) => {
	try {
		await listSolic();
		const obj = solicitudesTrabajando.find((items) => {
			return items.id_conectado === id_conectado && items.ident_num === user.ident_num;
		});

		if (obj) return solicitudesTrabajando.find((items) => items.ident_num === user.ident_num);

		if (solicitudes.length === 0 || allSolic === 0)
			throw { message: 'No existen solicitudes en espera', code: 400 };

		solicitudesTrabajando.unshift({ id_conectado, ...user, id: solic.id });

		console.log('trabajando', solicitudesTrabajando.length);

		//return itemNew;
		return {
			ok: true,
		};
	} catch (err) {
		console.log(err);
		return {
			ok: false,
			err,
		};
	}
};
