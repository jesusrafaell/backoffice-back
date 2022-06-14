import { NextFunction, Request, Response } from 'express';
import { Api } from '../../../../interfaces';
import { getRepository, In } from 'typeorm';
import Msg from '../../../../hooks/messages/index.ts';
import Resp from '../../Middlewares/res';
import fm_request from '../../../../db/models/fm_request';
import fm_status from '../../../../db/models/fm_status';
import { comercioToProviders } from '../providers';
import { saveLogs } from '../../../../utilis/logs';
import { upRecaudoFM } from '../../../files/controllers/1000pagos.controllers';

// responder FM por id
export const getFmAdministration = async (
	req: Request<any, Api.Resp>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		const query = await getRepository(fm_status).find({
			where: { id_department: 4, id_status_request: 3 },
			relations: ['id_request'],
		});

		if (!query.length) throw { message: 'no existen solicitudes en espera', code: 400 };

		const ids: any[] = query.map((item: any) => item.id_request.id);

		const query2 = await getRepository(fm_status).find({
			where: { id_request: In(ids), id_department: 7, id_status_request: 1 },
			relations: [
				'id_request',
				'id_request.id_commerce',
				'id_request.id_client',
				'id_request.rc_comp_dep',
				'id_request.id_payment_method',
				'id_request.id_type_payment',
			],
		});

		const info = query2;

		if (!query2.length) throw { message: 'no existen solicitudes en espera.', code: 400 };

		Resp(req, res, { message: 'FM respondida', info });
	} catch (err) {
		next(err);
	}
};

export const editStatusByIdAdministration = async (
	req: Request<any, Api.Resp, fm_request>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { id_FM }: any = req.params;
		//
		const { dataPago }: any = req.body;
		//
		const pago: any = JSON.parse(dataPago);

		const files: any = req.files;
		//
		const { id_status_request, id_payment_method, id_type_payment } = pago;

		const FM: any = await getRepository(fm_request).findOne(id_FM, {
			relations: ['id_valid_request'],
		});
		if (!FM) throw { message: 'FM no existe' };

		const { pagadero } = FM;

		if (!pagadero) {
			const resProviders: any = await comercioToProviders(FM, req.headers.token_text);
			if (!resProviders.ok) {
				throw { message: resProviders.message || 'Error en API Providers' };
			}
		} else {
			if (id_payment_method && id_type_payment) {
				await getRepository(fm_request).update({ id: id_FM }, { id_payment_method, id_type_payment });
			}

			const resFiles: any = await upRecaudoFM(files.imagen[0], FM.id_client, FM.id_commerce, id_FM);
			if (!resFiles.okey) {
				throw { message: resFiles.message || 'Error: Guardar Imagen' };
			}
		}

		if (id_status_request)
			await getRepository(fm_status).update({ id_request: id_FM, id_department: 7 }, { id_status_request });

		const message: string = Msg('Status del FM').edit;

		const { id }: any = req.headers.token;
		await saveLogs(id, 'POST', req.url, `Cambio de estatus FM: ${id_FM}/${id_status_request}`);

		Resp(req, res, { message });
	} catch (err) {
		next(err);
	}
};
