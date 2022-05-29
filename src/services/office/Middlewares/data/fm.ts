import { check, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage, StorageEngine, Options } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const validFmData: ValidationChain[] = [];

const filename = (req: Request, file: Express.Multer.File, cb: any) => {
	cb(null, uuidv4() + '@' + file.originalname.replace(/ /gi, '_'));
};

const storage: StorageEngine = diskStorage({
	destination: path.resolve('static'),
	filename,
});

const options: Options = {
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|pdf/;
		const mimetype = filetypes.test(file.mimetype);
		const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb({
				name: file.originalname,
				message: 'Error: File upload only supports the following filetypes - ' + filetypes,
			});
		}
	},
	limits: { fileSize: 10000000 },
	storage,
};

export const fmFormData = multer(options).fields([
	{ name: 'images', maxCount: 20 },
	{ name: 'constitutive_act', maxCount: 20 },
	{ name: 'planilla', maxCount: 20 },
	{ name: 'client' },
	{ name: 'commerce' },
	{ name: 'id_client' },
	{ name: 'id_commerce' },
	{ name: 'posX' },
]);

export const fmForDataExtraPos = multer(options).fields([
	{ name: 'images', maxCount: 20 },
	{ name: 'planilla', maxCount: 20 },
	{ name: 'id_client' },
	{ name: 'id_commerce' },
	{ name: 'posX' },
]);

export const fmForDataDiferido = multer(options).fields([
	{ name: 'images', maxCount: 20 },
	{ name: 'constitutive_act', maxCount: 20 },
	{ name: 'planilla', maxCount: 20 },
	{ name: 'id_fm' },
	{ name: 'client' },
	{ name: 'commerce' },
	{ name: 'pos' },
	{ name: 'solic' },
]);

export const validExistingClientDiferido: ValidationChain[] = [
	check('id_client', 'cliente no existe')
		//
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('email', 'el correo no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.normalizeEmail()
		.isEmail()
		.custom(NoSQL),
	check('id_ident_type', 'el tipo de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('ident_num', 'el numero de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isLength({ min: 6, max: 20 })
		.isNumeric()
		.custom(NoSQL),
];

export const validExistingCommerceDiferido: ValidationChain[] = [
	check('id_commerce', 'cliente no existe')
		//
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('id_ident_type', 'el tipo de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isNumeric()
		.custom(NoSQL),
	//
	check('ident_num', 'el numero de documento de identidad no es valido')
		.exists({ checkFalsy: true, checkNull: true })
		.isLength({ min: 6, max: 20 })
		.isNumeric()
		.custom(NoSQL),
];
