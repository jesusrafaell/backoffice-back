import fm_views from '../models/fm_views';
import { getRepository } from 'typeorm';

export const listViews: fm_views[] = [
	{
		name: 'Formulario de Act',
	},
	{
		name: 'Admision',
	},
	{
		name: 'Administracion',
	},
	{
		name: 'Cobranza',
	},
	{
		name: 'Actulizar Informacion',
	},
	{
		name: 'Gestion de Usuarios',
	},
];

const views = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_views).find({ where: listViews });
	if (!valid.length) await getRepository(fm_views).save(listViews);
};

export default views;
