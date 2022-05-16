import { getRepository } from 'typeorm';
import fm_status_photo from '../models/fm_status_photo';

const status_photo = async (): Promise<void> => {
	const data: fm_status_photo[] = [
		{
			name: 'Visible',
		},
		{
			name: 'No visible',
		},
	];
	//
	const valid = await getRepository(fm_status_photo).find({ where: data });
	if (!valid.length) await getRepository(fm_status_photo).save(data);
};

export default status_photo;
