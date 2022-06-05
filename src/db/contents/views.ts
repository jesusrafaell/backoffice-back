import fm_views from '../models/fm_views';
import { getRepository } from 'typeorm';

export const listViews: fm_views[] = [
	{
		//1
		name: 'Inicio',
		root: 'home',
	},
	{
		//2
		name: 'Formualrio de Act.',
		root: 'solicitud',
	},
	{
		//3
		name: 'Admision',
		root: 'admision',
	},
	{
		//4
		name: 'Administracion',
		root: 'administracion',
	},
	{
		//5
		name: 'Cobranza',
		root: 'cobranza',
	},
	{
		//6
		name: 'Editar Comercio',
		root: 'editar_commerce',
	},
	{
		//7
		name: 'Gestion de Seguridad',
		root: 'seguridad',
	},
	{
		//8
		name: 'Lista de Terminales',
		root: 'terminales',
	},
];

const views = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_views).find({ where: listViews });
	if (!valid.length) await getRepository(fm_views).save(listViews);
};

export default views;
