import { getRepository } from 'typeorm';
import fm_actions from '../models/fm_actions';

export const listActions: fm_actions[] = [
	//admision
	{
		name: 'base', //se va a utilizar para solo consultar
		id_department: 1,
	},
	{
		name: 'Creacion FM',
		id_department: 4,
	},
	{
		name: 'Validacion FM',
		id_department: 4,
	},
	{
		name: 'Diferido FM',
		id_department: 4,
	},
	{
		name: 'Mover FM',
		id_department: 4,
	},
	//seguidad posision el siguente 6
	{
		name: 'Editar usuarios',
		id_department: 3,
	},
	{
		name: 'Creacion de Accesos',
		id_department: 3,
	},
	{
		name: 'Creacion Departamentos',
		id_department: 3,
	},
	//administracion postion siguente 9
	{
		name: 'Validar Pago',
		id_department: 7,
	},
];

const actions = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_actions).find({ where: listActions });
	if (!valid.length) await getRepository(fm_actions).save(listActions);
};

export default actions;
