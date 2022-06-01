import { getRepository } from 'typeorm';
import fm_actions from '../models/fm_actions';

export const listActions: fm_actions[] = [
	//admision
	{
		name: 'base', //se va a utilizar para solo consultar
	},
	{
		name: 'Creacion FM',
	},
	{
		name: 'Validacion FM',
	},
	{
		name: 'Diferido FM',
	},
	{
		name: 'Mover FM',
	},
	//seguidad posision el siguente 6
	{
		name: 'Ver Usuarios',
	},
	{
		name: 'Editar usuarios',
	},
	{
		name: 'Crear Departamento',
	},
	{
		name: 'Editar Permisos',
	},
	//administracion postion siguente 9
	{
		name: 'Ver Pago',
	},
	{
		name: 'Validar Pago',
	},
];

const actions = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_actions).find({ where: listActions });
	if (!valid.length) await getRepository(fm_actions).save(listActions);
};

export default actions;
