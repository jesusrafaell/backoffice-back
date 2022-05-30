import { getRepository } from 'typeorm';
import fm_request from '../../../../db/models/fm_request';
import fm_location from '../../../../db/models/fm_location';
import fm_posXcommerce from '../../../../db/models/fm_posXcommerce';

export const updatePos = async (dataPos: any, id_FM: number) => {
	try {
		//guardar data sin importar que
		const { location } = dataPos;
		//
		const fm: any = await getRepository(fm_request).findOne(id_FM, { relations: ['pos', 'pos.id_location'] });
		//console.log(fm.number_post);
		const { number_post } = fm;
		const post: any[] = fm.pos; //[]
		if (number_post <= post.length) {
			for (let i = 0; i < number_post; i++) {
				await getRepository(fm_posXcommerce).update(post[i].id, { id_product: dataPos.model_post, active: 1 });
				await getRepository(fm_location).update(post[i].id_location.id, {
					id_direccion: location.id_direccion,
					calle: location.calle,
					local: location.local,
				});
				let poss = await getRepository(fm_posXcommerce).findOne(post[i].id, { relations: ['id_location'] });
				//console.log('new Data pos', poss);
			}
			for (let i = number_post; i < post.length; i++) {
				await getRepository(fm_posXcommerce).update(post[i].id, { active: 0 });
			}
		} else {
			//console.log(number_post, '>', post.length);
			for (let i = 0; i < post.length; i++) {
				await getRepository(fm_posXcommerce).update(post[i].id, { id_product: dataPos.model_post, active: 1 });
				await getRepository(fm_location).update(post[i].id_location.id, {
					id_direccion: location.id_direccion,
					calle: location.calle,
					local: location.local,
				});
				let poss = await getRepository(fm_posXcommerce).findOne(post[i].id, { relations: ['id_location'] });
				//console.log('new Data pos', poss);
			}
			for (let i = post.length; i < number_post; i++) {
				await getRepository(fm_posXcommerce).save({
					id_location: location.id,
					id_commerce: fm.id_commerce,
					id_request: fm.id,
					id_product: dataPos.model_post,
				});
			}
		}
		//console.log(post.length);

		return {
			ok: true,
		};
	} catch (err) {
		console.log("error update pos's diferido", err);
		return {
			ok: false,
			err,
		};
	}
};
