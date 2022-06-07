import fm_direccion from '../models/fm_direccion';
import { getConnection, getRepository } from 'typeorm';

const direccion = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_direccion).find();
	if (valid.length) return;

	const connection = await getConnection().query(
		`
    `
	);
};

export default direccion;
