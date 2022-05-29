import fm_department from 'db/models/fm_department';
import { getRepository } from 'typeorm';
import fm_access_views from '../models/fm_access_views';
import fm_views from '../models/fm_views';
import { listDeparment } from './department';
import { listViews } from './views';

const access_views = async (): Promise<void> => {
	let dataPre: fm_access_views[] = [];
	listDeparment.map((depart: fm_department, index: number) => {
		dataPre.push({
			id_department: index + 1,
			id_views: 1,
		});
	});

	let data: fm_access_views[] = [
		//Bas		//Fuerza de venta
		{
			id_department: 2,
			id_views: 2,
		},
		//Seguridad
		{
			id_department: 3,
			id_views: 7,
		},
		//Admision
		{
			id_department: 4,
			id_views: 2,
		},
		{
			id_department: 4,
			id_views: 3,
		},
		//Cobranzas
		{
			id_department: 5,
			id_views: 4,
		},
		//Administracion
		{
			id_department: 7,
			id_views: 3,
		},
		{
			id_department: 7,
			id_views: 4,
		},
	];

	data = dataPre.concat(data);

	//God
	listViews.map((item: fm_views, index: number) => {
		if (index !== 0)
			data.push({
				id_department: 8,
				id_views: index + 1,
			});
	});

	//presidencia
	listViews.map((item: fm_views, index: number) => {
		if (item.name !== 'Gestion de Usuario' && index !== 0) {
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
