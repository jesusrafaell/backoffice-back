import { getRepository } from 'typeorm';
import fm_request from '../../../../db/models/fm_request';

export const updateSolic = async (fm: any) => {
	try {
		//console.log('data', fm);
		const { id, rc_planilla, rc_ref_bank, rc_comp_dep, ...dataFM } = fm;
		//console.log(fm);

		await getRepository(fm_request).update(id, dataFM);

		return {
			ok: true,
		};
	} catch (err) {
		console.log('error update solic(fm) diferido', err);
		return {
			ok: false,
			err,
		};
	}
};
