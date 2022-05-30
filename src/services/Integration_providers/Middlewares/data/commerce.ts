import { check, oneOf, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

export const CreateCommerceData: ValidationChain[] = [
	//
	check('id_fm', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('id_commerce', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('net_id', 'net_id invalida').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
];

export const CreateTerminalData: ValidationChain[] = [
	//
	check('id_fm', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('id_commerce', 'nombre invalido').exists({ checkFalsy: true, checkNull: true }).isNumeric().custom(NoSQL),
	//
	check('red', 'red invalida').exists({ checkFalsy: true, checkNull: true }).custom(NoSQL),
];
