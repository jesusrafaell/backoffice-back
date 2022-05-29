import fm_views from '../models/fm_views';
import { getRepository } from 'typeorm';

export const listViews: fm_views[] = [
	{
		//1
		name: 'Home',
	},
	{
		//2
		name: 'Solicitud',
	},
	{
		//3
		name: 'Admision',
	},
	{
		//4
		name: 'Administracion',
	},
	{
		//5
		name: 'Cobranza',
	},
	{
		//6
		name: 'EditarComercio',
	},
	{
		//7
		name: 'GestionUsuarios',
	},
];

const views = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_views).find({ where: listViews });
	if (!valid.length) await getRepository(fm_views).save(listViews);
};

export default views;
