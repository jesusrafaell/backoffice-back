import fm_client from '../../../../db/models/fm_client';
import { getRepository } from 'typeorm';

export const updateClient = async (client: any) => {
	//guardar data sin importar que
	console.log('new', client);
	const oldClient = await getRepository(fm_client).findOne(client.id);
	console.log(oldClient);
	return null;
	/*
	const oldClient = await getRepository(fm_client).update(client.id{
	});
  */
};
