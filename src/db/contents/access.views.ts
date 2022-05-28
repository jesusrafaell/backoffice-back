import { getRepository } from 'typeorm';
import fm_access_views from '../models/fm_access_views';
import fm_views from '../models/fm_views';
import { listViews } from './views';

const access_views = async (): Promise<void> => {
	const data: fm_access_views[] = [
		{
			id_department: 2,
			id_views: 1,
		},
		{
			id_department: 3,
			id_views: 1,
		},
		{
			id_department: 6,
			id_views: 1,
		},
		{
			id_department: 4,
			id_views: 1,
		},
		{
			id_department: 4,
			id_views: 2,
		},
		{
			id_department: 5,
			id_views: 4,
		},
		{
			id_department: 7,
			id_views: 4,
		},
	];

	//God
	listViews.map((item: fm_views, index: number) => {
		data.push({
			id_department: 8,
			id_views: index + 1,
		});
	});

	//presidencia
	listViews.map((item: fm_views, index: number) => {
		if (item.name !== 'Gestion de Usuario') {
			data.push({
				id_department: 10,
				id_views: index + 1,
			});
		}
	});

	//
	const valid = await getRepository(fm_access_views).find({ where: data });
	if (!valid.length) await getRepository(fm_access_views).save(data);
};

export default access_views;
