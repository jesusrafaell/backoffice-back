import { getRepository } from 'typeorm';
import fm_actions from '../models/fm_actions';

export const listActions: fm_actions[] = [
	//admision
	{
		name: 'base', //se va a utilizar para solo consultar
		id_views: 1,
		description: 'No hace nada',
	},
	{
		name: 'Creacion FM',
		id_views: 2,
		description: 'Crear formularios de activacion',
	},
	{
		name: 'Validacion FM',
		id_views: 3,
		description: 'Ver y validar formularios de activacion',
	},
	{
		name: 'Diferido FM',
		id_views: 3,
		description: 'Validar formularios de activacion que esten diferidos',
	},
	{
		name: 'Mover FM',
		id_views: 3,
		description: 'Mover o colear formularios de activacion',
	},
	//seguidad posision el siguente 6
	{
		name: 'Ver Usuarios',
		id_views: 7,
		description: 'Ver informacion de los usuarios',
	},
	{
		name: 'Editar usuarios',
		id_views: 7,
		description: 'Modificar informacion de los usuarios',
	},
	{
		name: 'Crear Departamento',
		id_views: 7,
		description: 'Crear nuevos departamentos',
	},
	{
		name: 'Editar Permisos',
		id_views: 7,
		description: 'Modificar los permisos de un departamentos y cargo',
	},
	//administracion postion siguente 9
	{
		name: 'Ver Pago',
		id_views: 4,
		description: 'Ver el comprobante o informacion de pago',
	},
	{
		name: 'Validar Pago',
		id_views: 4,
		description: 'Valiar el pago de un formulario de activacion',
	},
	{
		name: 'Editar Vistas',
		id_views: 7,
		description: 'Modificar las vistas que tiene acceso un departamento',
	},
];

const actions = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_actions).find({ where: listActions });
	if (!valid.length) await getRepository(fm_actions).save(listActions);
};

export default actions;
