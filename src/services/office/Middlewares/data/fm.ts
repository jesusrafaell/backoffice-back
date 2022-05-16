import { check, ValidationChain } from 'express-validator';
import { NoSQL } from './index';

import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage, StorageEngine, Options } from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const validFmData: ValidationChain[] = [
	/*
	//
	check('rc_ref_bank', 'la referencia bancaria es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_ident_card', 'el rc_ident_card es requerido').isNumeric().custom(NoSQL),
	//
	check('rc_rif', 'rif es requerido').isNumeric().custom(NoSQL),
	//
	check('number_post', 'number_post es requerido').isNumeric().custom(NoSQL),
	// validar la data del cliente
	//
	check('bank_account_num', 'bank_account_num invalido').isString().custom(NoSQL),
	//
	check('id_client', 'id_client es requerido').isNumeric().custom(NoSQL),
	//
	check('id_product', 'id_product es requerido').isNumeric().custom(NoSQL),
	//
	check('id_commerce', 'id_commerce es requerido').isNumeric().custom(NoSQL),
	//
	check('pos', 'la pos es obligatoria').isObject().custom(NoSQL),
	//
	check('id_type_payment', 'id_type_payment es requerido').isNumeric().custom(NoSQL),
	//
	check('id_payment_method', 'id_payment_method es requerido').isNumeric().custom(NoSQL),
	//
	check('id_request_origin', 'id_request_origin es requerido').isNumeric().custom(NoSQL),
	*/
];

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
	{ name: 'fm' },
]);
