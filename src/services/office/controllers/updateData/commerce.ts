import { getRepository } from 'typeorm';
import fm_location from '../../../../db/models/fm_location';
import fm_commerce from '../../../../db/models/fm_commerce';

export const updateCommerce = async (commerce: any) => {
	try {
		//guardar data sin importar que
		//console.log('data', commerce);
		const { id, rc_constitutive_act, rc_rif, rc_special_contributor, validate, location, ...dataCommerce } =
			commerce;
		//
		const oldCommerce: any = await getRepository(fm_commerce).findOne(id, {
			relations: ['id_location'],
		});
		//console.log('idlocation', oldCommerce.id_location);
		//console.log('old', oldCommerce);
		//editar info
		await getRepository(fm_commerce).update(commerce.id, dataCommerce);

		//editar location
		await getRepository(fm_location).update(oldCommerce?.id_location.id, {
			id_direccion: location.id_direccion,
			calle: location.calle,
			local: location.local,
		});

		return {
			ok: true,
		};
	} catch (err) {
		console.log('error update commerce diferido');
		return {
			ok: false,
			err,
		};
	}
};
