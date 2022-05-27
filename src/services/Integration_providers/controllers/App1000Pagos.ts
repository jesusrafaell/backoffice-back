import fm_request from '../../../db/models/fm_request';
import fm_phone from '../../../db/models/fm_phone';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { DateTime } from 'luxon';
import Comercios from '../../../db/models/Comercios';
import Contactos from '../../../db/models/Contactos';
import { Api } from '../../../interfaces';
import ComerciosXafiliado from '../../../db/models/ComerciosXafliado';
import fm_commerce from '../../../db/models/fm_commerce';
import commerces from 'services/office/router/commerces';
import Abonos from '../../../db/models/Abonos';
import { Terminal } from '../../../interfaces/general';

export const createCommerce = async (
	req: Request<Api.params, Api.Resp, { id_fm: number; id_commerce: number; id_client: number }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		console.log('Comercio en 1000pagos');
		console.log(req.body.id_fm, req.body.id_commerce, req.body.id_client);
		const fmData = await getRepository(fm_request).findOne({
			where: { id: req.body.id_fm, id_commerce: req.body.id_commerce, id_client: req.body.id_client },
			order: { id: 'ASC' },
			relations: [
				// client
				'id_client',
				'id_client.id_location',
				'id_client.id_location.id_direccion',
				// 'id_client.id_location.id_estado',
				// 'id_client.id_location.id_municipio',
				// 'id_client.id_location.id_ciudad',
				// 'id_client.id_location.id_parroquia',
				'id_client.id_ident_type',
				'id_client.phones',
				//pos
				'pos',
				'pos.id_location',
				'pos.id_location.id_direccion',
				// 'pos.id_location.id_estado',
				// 'pos.id_location.id_municipio',
				// 'pos.id_location.id_ciudad',
				// 'pos.id_location.id_parroquia',
				// commerce
				'id_commerce',
				'id_commerce.id_ident_type',
				'id_commerce.id_activity',
				'id_commerce.id_activity.id_afiliado',
				'id_commerce.id_location',
				'id_commerce.id_location.id_direccion',
				// 'id_commerce.id_location.id_estado',
				// 'id_commerce.id_location.id_municipio',
				// 'id_commerce.id_location.id_ciudad',
				// 'id_commerce.id_location.id_parroquia',
				//
			],
		});
		if (!fmData) throw { message: 'el commercio suministrado no existe', code: 400 };

		const { id_commerce, id_client, bank_account_num, id_product, pos, number_post }: any = fmData;

		const fmCommerce1000pagos = await getRepository(Comercios).findOne({
			where: {
				comerRif: id_commerce.id_ident_type.name + id_commerce.ident_num,
			},
		});

		const dirCC = id_commerce.id_location.id_direccion;
		const dirC = id_client.id_location.id_direccion;
		const dirPos = pos[0].id_location.id_direccion;

		const addressCommerce = `${dirCC.estado}, ${dirCC.municipio}, ${dirCC.ciudad}, ${dirCC.parroquia}. ${dirCC.sector}, ${id_commerce.id_location.calle}, ${id_commerce.id_location.local}`;
		const address_Client = `${dirC.estado}, ${dirC.municipio}, ${dirC.ciudad}, ${dirC.parroquia}. ${dirC.sector}, ${id_client.id_location.calle}, ${id_client.id_location.local}`;
		const address_Pos1 = `${dirPos.estado}, ${dirPos.municipio}, ${dirPos.ciudad}, ${dirPos.parroquia}. ${dirPos.sector}, ${pos[0].id_location.calle}, ${pos[0].id_location.local}`;

		if (!fmCommerce1000pagos) {
			const commerce: any = {
				comerDesc: id_commerce.name,
				comerTipoPer: [3, 4].includes(id_commerce.id_ident_type.id) ? 2 : 1,
				comerCodigoBanco: bank_account_num.slice(0, 4),
				comerCuentaBanco: bank_account_num,
				comerPagaIva: 'SI',
				comerCodUsuario: null,
				comerCodPadre: 0,
				comerRif: id_commerce.id_ident_type.name + id_commerce.ident_num,
				comerFreg: null,
				comerCodTipoCont: id_commerce.special_contributor ? 2 : 1,
				comerInicioContrato: DateTime.local().toISODate(),
				comerFinContrato: DateTime.local().plus({ years: 1 }).toISODate(),
				comerExcluirPago: 0,
				comerCodCategoria: 5411,
				comerGarantiaFianza: 1,
				comerModalidadGarantia: 1,
				comerMontoGarFian: 7.77,
				comerModalidadPos: 3,
				comerTipoPos: id_product,
				comerRecaudos: null,
				comerDireccion: addressCommerce,
				//
				comerObservaciones: '',
				comerCodAliado: id_commerce.id_aci,
				comerEstatus: 5,
				comerHorario: null,
				comerImagen: null,
				comerPuntoAdicional: 0,
				comerCodigoBanco2: '',
				comerCuentaBanco2: '',
				comerCodigoBanco3: '',
				comerCuentaBanco3: '',
				//
				comerDireccionHabitacion: address_Client,
				//
				comerDireccionPos: address_Pos1,
				//
				comerDiasOperacion: id_commerce.days,
				comerFechaGarFian: null,
			};

			const comercioSave = await getRepository(Comercios).save(commerce);

			console.log('Comercio creado en 1000pagos');

			const contacto: any = {
				contCodComer: comercioSave.comerCod,
				contCodUsuario: null,
				contNombres: id_client.name,
				contApellidos: id_client.last_name,
				contTelefLoc: '0' + id_client.phones[0].phone.slice(3, id_client.phones[0].phone.length),
				contTelefMov: '0' + id_client.phones[1].phone.slice(3, id_client.phones[1].phone.length),
				contMail: id_client.email,
				contFreg: null,
			};

			await getRepository(Contactos).save(contacto);

			console.log('contacto creado en 1000pago', contacto);

			const cxaCodAfi = `${id_commerce.id_activity.id_afiliado.id}`.split('');
			while (cxaCodAfi.length < 15) cxaCodAfi.unshift('0');
			const cxaCod: string = cxaCodAfi.join('');

			let comerXafiSave = await getRepository(ComerciosXafiliado).findOne({
				where: { cxaCodComer: comercioSave!.comerCod },
			});

			if (!comerXafiSave) {
				comerXafiSave = await getRepository(ComerciosXafiliado).save({
					cxaCodAfi: cxaCod,
					cxaCodComer: comercioSave!.comerCod,
				});
			} else {
				console.log('ComercioXafiliado ', contacto.contMail, ' ya existe');
			}
		} else console.log('El comercio ya existe en 1000pagos');

		res.status(200).json({ message: 'Comercio creado' });
	} catch (err) {
		console.log('Error al crear comercio en 1000pagos');
		next(err);
	}
};

export const abono1000pagos = async (
	req: Request<Api.params, Api.Resp, { commerce: any; terminals: Terminal[] }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { commerce, terminals } = req.body;
	//console.log('terminales X', terminals);

	try {
		//console.log('abono lo que llego', terminals.length, commerce);
		const resComercio: any = await getRepository(Comercios).findOne({
			where: { comerRif: commerce.id_ident_type.name + commerce!.ident_num },
		});
		if (!resComercio) throw { message: 'el commercio suministrado no existe', code: 400 };

		const resTermAbono: any = await getRepository(Abonos).find({
			where: { aboCodComercio: resComercio.comerCod },
		});

		//buscar terminals en abono
		let abono: Abonos[] = [];
		if (resTermAbono.length) {
			console.log('Tiene abonos tengo que recorrer');
			//remover los terminales existentes[3312]
			for (let i = 0; i < terminals.length; i++) {
				let flag = true;
				for (let j = 0; j < resTermAbono.length; j++) {
					if (terminals[i].terminalId === resTermAbono[j].aboTerminal) {
						flag = false;
						break;
					}
				}
				//console.log(terminals[i].terminalId);

				if (flag) {
					abono.push({
						//aboCod: 1458,
						aboCodAfi: `${commerce.id_activity.id_afiliado.id}`.padStart(15, '0'),
						aboTerminal: terminals[i].terminalId,
						aboCodComercio: resComercio.comerCod,
						aboCodBanco: resComercio.comerCodigoBanco,
						aboNroCuenta: resComercio.comerCuentaBanco,
						aboTipoCuenta: '01',
						estatusId: 23,
						pagoContado: 0,
					});
				}
			}
		} else {
			console.log('No tiene abonos');
			//console.log(commerce);
			//console.log(commerce.id_activity.id_afiliado);
			console.log(`${commerce.id_activity.id_afiliado.id}`.padStart(15, '0'));
			for (let i = 0; i < terminals.length; i++) {
				abono.push({
					//aboCod: 1458,
					aboCodAfi: `${commerce.id_activity.id_afiliado.id}`.padStart(15, '0'),
					aboTerminal: terminals[i].terminalId,
					aboCodComercio: resComercio.comerCod,
					aboCodBanco: resComercio.comerCodigoBanco,
					aboNroCuenta: resComercio.comerCuentaBanco,
					aboTipoCuenta: '01',
					estatusId: 23,
					pagoContado: 0,
				});
			}
		}

		//console.log('save this abono', abono);

		await getRepository(Abonos).save(abono);

		//console.log('save abono', abono);

		res.status(200).json({ message: 'Abonos creados' });
	} catch (err) {
		console.log('Error al crear abono en 1000pagos');
		next(err);
	}
};

export const editCommerce = async (
	req: Request<Api.params, Api.Resp, { id_commerce: number; rif: string }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		//console.log('Comercio en 1000pagos editar', req.body.id_commerce, ' / ', req.body.rif);
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

		const commerce1000pagos = await getRepository(Comercios).findOne({
			where: {
				comerRif: rif,
			},
		});

		const { id_location }: any = commerce;
		const dirCC = id_location.id_direccion;

		const addressCommerce = `${dirCC.estado}, ${dirCC.municipio}, ${dirCC.ciudad}, ${dirCC.parroquia}. ${dirCC.sector}, ${id_location.calle}, ${id_location.local}`;

		if (commerce1000pagos) {
			const newDataCommerce: any = {
				comerDesc: commerce.name,
				comerTipoPer: [3, 4].includes(commerce.id_ident_type.id) ? 2 : 1,
				comerRif: commerce.id_ident_type.name + commerce.ident_num,
				comerCodTipoCont: commerce.special_contributor ? 2 : 1,
				comerDireccion: addressCommerce,
				comerCodAliado: commerce.id_aci,
				comerDiasOperacion: commerce.days,
				//comerCodigoBanco: bank_account_num.slice(0, 4),
				//comerCuentaBanco: bank_account_num,
			};

			const comercioSave = await getRepository(Comercios).update(
				{ comerCod: commerce1000pagos.comerCod },
				newDataCommerce
			);

			console.log('Comercio editado en 1000pagos');

			const cxaCodAfi = `${commerce.id_activity.id_afiliado.id}`.split('');
			while (cxaCodAfi.length < 15) cxaCodAfi.unshift('0');
			const cxaCod: string = cxaCodAfi.join('');

			let comerXafiSave = await getRepository(ComerciosXafiliado).findOne({
				where: { cxaCodComer: commerce1000pagos!.comerCod },
			});

			if (comerXafiSave) {
				await getRepository(ComerciosXafiliado).update(
					{ cxaId: comerXafiSave.cxaId },
					{
						cxaCodAfi: cxaCod,
						cxaCodComer: commerce1000pagos!.comerCod,
					}
				);
			}
		} else {
			console.log('El comercio no existe en 1000pagos');
			throw { message: 'El Comercio no existe en el Aplicativo 1000pagos' };
		}

		res.status(200).json({ message: 'Comercio editado' });
	} catch (err) {
		console.log('Error al editar comercio en 1000pagos');
		next(err);
	}
};
