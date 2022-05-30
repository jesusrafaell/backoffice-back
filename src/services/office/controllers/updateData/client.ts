import fm_client from '../../../../db/models/fm_client';
import { getRepository } from 'typeorm';
import fm_location from '../../../../db/models/fm_location';
import fm_phone from '../../../../db/models/fm_phone';

export const updateClient = async (client: any) => {
	try {
		//guardar data sin importar que
		//console.log('data', commerce);
		const { id, validate, location, phones, ...dataClient } = client;
		//buscar id de telefonos
		const oldClient: any = await getRepository(fm_client).findOne(id, {
			relations: ['phones', 'id_location'],
		});
		//editar info
		await getRepository(fm_client).update(client.id, dataClient);

		//editar location
		await getRepository(fm_location).update(oldClient?.id_location.id, {
			id_direccion: location.id_direccion,
			calle: location.calle,
			local: location.local,
		});

		//editar telefonos
		await getRepository(fm_phone).update(oldClient.phones[0].id, {
			phone: phones.phone1,
		});
		await getRepository(fm_phone).update(oldClient.phones[1].id, {
			phone: phones.phone2,
		});
		return {
			ok: true,
		};
	} catch (err) {
		console.log('error update client diferido');
		return {
			ok: false,
			err,
		};
	}
};
