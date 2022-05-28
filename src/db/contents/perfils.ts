import { getRepository } from 'typeorm';
import fm_perfil from '../models/fm_perfil';

export const listPerfil: fm_perfil[] = [
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
		name: 'Creacion Perfiles',
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

const perfils = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_perfil).find({ where: listPerfil });
	if (!valid.length) await getRepository(fm_perfil).save(listPerfil);
};

export default perfils;
