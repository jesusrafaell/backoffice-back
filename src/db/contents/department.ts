import { getRepository } from 'typeorm';
import fm_department from '../models/fm_department';

export const listDeparment: fm_department[] = [
	{
		name: 'Base',
	},
	{
		name: 'Fuerza de Venta',
	},
	{
		name: 'Seguridad',
	},
	{
		name: 'Admision',
	},
	{
		name: 'Cobranza',
	},
	{
		name: 'Activacion',
	},
	{
		name: 'Administracion',
	},
	{
		name: 'God',
	},
	{
		name: 'Canales',
	},
	{
		name: 'Presidencia',
	},
];

const department = async (): Promise<void> => {
	//
	const valid = await getRepository(fm_department).find({ where: listDeparment });
	if (!valid.length) await getRepository(fm_department).save(listDeparment);
};

export default department;
