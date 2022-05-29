import { getRepository } from 'typeorm';
import fm_department from '../models/fm_department';

export const listDeparment: fm_department[] = [
	{
		//1
		name: 'Ninguno',
	},
	{
		//2
		name: 'Fuerza de Venta',
	},
	{
		//3
		name: 'Seguridad',
	},
	{
		//4
		name: 'Admision',
	},
	{
		//5
		name: 'Cobranza',
	},
	{
		//6
		name: 'Activacion',
	},
	{
		//7
		name: 'Administracion',
	},
	{
		//8
		name: 'God',
	},
	{
		//9
		name: 'Canales',
	},
	{
		//10
		name: 'Presidencia',
	},
];

const department = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_department).find({ where: listDeparment });
	if (!valid.length) await getRepository(fm_department).save(listDeparment);
};

export default department;
