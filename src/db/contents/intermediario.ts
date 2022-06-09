import { getRepository } from 'typeorm';
import fm_intermediario from '../models/fm_intermediario';

const intermediario = async (): Promise<void> => {
	const data: fm_intermediario[] = [
		{
			name: 'TMS7',
			description: 'Intermediario para comercios y terminales',
		},
		{
			name: 'Pagina de Terminales',
			description: 'Intermediario para terminales',
		},
	];
	//
	const valid = await getRepository(fm_intermediario).find({ where: data });
	if (!valid.length) await getRepository(fm_intermediario).save(data);
};

export default intermediario;
