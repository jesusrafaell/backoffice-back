// modules
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import list from './list';
const Key: string = process.env.KEY || '_secreto';

/** this middleware is for convert json web token in Objet format */
export default (req: Request, res: Response, next: NextFunction) => {
	try {
		// define array route

		// valid use
		const result: boolean =
			list.includes(req.baseUrl) || list.includes(req.path.split('/')[1]) || list.includes(req.path.split('/')[2]);

		// use
		console.log('bug0', result, req.path);
		if (result) {
			//console.log('bug1', req.headers?.authorization);
			if (req.headers.authorization) {
				//console.log('bug2');
				const token: string = req.headers.authorization;
				console.log('token', token);
				//console.log('bug3');
				const Resp: any = jwt.verify(token, Key);
				// console.log('Resp',Resp);

				//console.log('bug5');

				req.headers.token = Resp;
				req.headers.token_text = token;

				//console.log('bug6', req.path);

				next();
				//
			} else throw { status: false, message: 'JWT es requerido', code: 400 };
		} else {
			next();
		}
	} catch (err: any) {
		err.code = 403;
		next(err);
	}
};
