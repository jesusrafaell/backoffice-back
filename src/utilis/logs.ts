import { getRepository } from 'typeorm';
import general_logs from '../db/models/general_logs';

export const saveLogs = async (id: number, method: string, path: string, msg: string) => {
	try {
		const log: general_logs = {
			email: `${id}`,
			descript: `[method:${method}::[path:${path}]::[msg]:${msg}]`,
			id_origin_logs: 1,
		};

		await getRepository(general_logs).save(log);
	} catch (err) {
		console.log('logs', err);
		return err;
	}
};
