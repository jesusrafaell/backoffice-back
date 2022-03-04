<<<<<<< HEAD
import { getRepository } from 'typeorm';
import fm_type_person from '../models/fm_type_person';

const type_person = async (): Promise<void> => {
	const data: fm_type_person[] = [
		{ id: 1, name: 'Natural' },
		{ id: 2, name: 'Juridico' },
	];

	//
	const valid = await getRepository(fm_type_person).find({ where: data });
	if (!valid.length) await getRepository(fm_type_person).save(data);
};

export default type_person;
=======
import { getRepository } from 'typeorm';
import fm_type_person from '../models/fm_type_person';

const type_person = async (): Promise<void> => {
	const data: fm_type_person[] = [
		{ id: 1, name: 'Natural' },
		{ id: 2, name: 'Juridico' },
	];

	//
	const valid = await getRepository(fm_type_person).find({ where: data });
	if (!valid.length) await getRepository(fm_type_person).save(data);
};

export default type_person;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
