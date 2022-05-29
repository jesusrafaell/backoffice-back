import { getRepository } from 'typeorm';
import fm_worker from '../../../db/models/fm_worker';

export const getWorkerFromEmail = async (email: string) => {
	try {
		const worker = await getRepository(fm_worker).findOne({
			where: { email },
		});

		const { password, ...newUser }: any = worker;

		return newUser;
	} catch (err) {
		console.log('err', err);
	}
};
