import { getRepository } from 'typeorm';
import fm_request_origin from '../models/fm_request_origin';

const request_origin = async (): Promise<void> => {
	const data: fm_request_origin[] = [
		{
			name: 'Referido',
		},
		{
			name: 'ACI',
		},
		{
			name: 'Call Center',
		},
		{
			name: 'Feria',
		},
		{
			name: 'Pagina WEB',
		},
		{
			name: 'Banco',
		},
	];
	//
	const valid = await getRepository(fm_request_origin).find({ where: data });
	if (!valid.length) await getRepository(fm_request_origin).save(data);
};

export default request_origin;
