import { getRepository } from 'typeorm';
import fm_actions from '../models/fm_actions';

export const listActions: fm_actions[] = [
	//admision
	{
		name: 'base', //se va a utilizar para solo consultar
		id_views: 1,
	},
	{
		name: 'Creacion FM',
		id_views: 2,
	},
	{
		name: 'Validacion FM',
		id_views: 3,
	},
	{
		name: 'Diferido FM',
		id_views: 3,
	},
	{
		name: 'Mover FM',
		id_views: 3,
	},
	//seguidad posision el siguente 6
	{
		name: 'Ver Usuarios',
		id_views: 7,
	},
	{
		name: 'Editar usuarios',
		id_views: 7,
	},
	{
		name: 'Crear Departamento',
		id_views: 7,
	},
	{
		name: 'Editar Permisos',
		id_views: 7,
	},
	//administracion postion siguente 9
	{
		name: 'Ver Pago',
		id_views: 4,
	},
	{
		name: 'Validar Pago',
		id_views: 4,
	},
	{
		name: 'Editar Vistas',
		id_views: 7,
	},
];

const actions = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_actions).find({ where: listActions });
	if (!valid.length) await getRepository(fm_actions).save(listActions);
};

export default actions;
