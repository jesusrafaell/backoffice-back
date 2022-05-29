// modules
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { getRepository } from 'typeorm';

// services and hooks and personal interface
import { Api } from '../../../../interfaces';
import { mail } from '../../../../helpers';

// db talbes
import fm_worker from '../../../../db/models/fm_worker';
import fm_permissions from '../../../../db/models/fm_permissions';
import generateToken from '../../../../utilis/generateToken';
import { DataUser, dataWorker, getViews } from './utils.ts';

// getter a Client
export const register = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response<Api.Resp<{ token: string; data: any }> | any>,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email, id_ident_type, ident_num } = req.body;

		// validar existencia de la clave cumpuesta
		const validIdent = await getRepository(fm_worker).findOne({ id_ident_type, ident_num });
		if (validIdent) throw { message: 'el documento de identidad ya existe' };

		// validar existencia de la clave cumpuesta
		const validMail = await getRepository(fm_worker).findOne({ email });
		if (validMail) throw { message: 'el correo ya existe' };

		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(req.body.password, salt);

		//console.log(req.body);

		await getRepository(fm_worker).save(req.body); //guardar user

		//buscar el usuario guardado con sus relaciones
		const worker = await getRepository(fm_worker).findOne({
			where: { email },
			relations: ['id_rol', 'id_department'],
		});

		const { id, password, id_rol, id_department, ...data_user }: any = worker;

		// generar token
		const token = generateToken(id, id_department, id_rol);

		// enviar correo de validacion
		await mail.verify(req.body);

		// Response

		res.status(200).json({
			message: 'Trabajador registrado Revise su correo por favor',
			info: dataWorker(data_user, id_rol, id_department, [], []),
			token,
		});
	} catch (err) {
		next(err);
	}
};

// register valid 1
export const registerValid1 = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { email } = req.body;

		// validar existencia de la clave cumpuesta
		const Worker = await getRepository(fm_worker).findOne({ email });
		if (Worker) throw { message: 'el correo ya existe' };

		res.status(200).json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
};

// register valid 1
export const registerValid2 = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		validationResult(req).throw();

		const { id_ident_type, ident_num } = req.body;

		// validar existencia de la clave cumpuesta
		const Worker = await getRepository(fm_worker).findOne({ id_ident_type, ident_num });
		if (Worker) throw { message: 'el documento de identidad ya existe' };

		res.status(200).json({ message: 'ok' });
	} catch (err) {
		next(err);
	}
};

const block = async (email: string): Promise<void> => {
	await getRepository(fm_worker)
		.createQueryBuilder()
		.update(fm_worker)
		.set({ block: () => 'block + 1' })
		.where('email = :email', { email })
		.execute();
};

// getter a Client

export const login = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response<Api.Resp<DataUser>>,
	next: NextFunction
): Promise<void> => {
	const { email } = req.body;

	try {
		// encript password
		const resWorker = await getRepository(fm_worker).findOne({
			where: { email },
			relations: ['id_rol', 'id_department', 'id_department.access_views', 'id_department.access_views.id_views'],
		});

		if (!resWorker) throw { message: 'correo o contraseña incorrecta', code: 400 };

		const { id_department: dep, id_rol, ...worker }: any = resWorker;
		const { access_views, ...id_department }: any = dep;

		//console.log('dep', id_department.id, 'rol', id_rol.id);
		const views = getViews(access_views); //obtener lista de vistas

		let permiss: any[] = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss = await getRepository(fm_permissions).find({
				where: { id_department: id_department.id, id_rol: id_rol.id },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = resPermiss;

			//console.log(permiss);
		} else {
			console.log('usuario no posee nigun deparmento');
		}

		// extraemos data
		const { password, id, block, ...data_user }: any = worker;

		const validPassword = await bcrypt.compare(req.body.password, password);
		if (!validPassword) {
			if (block === 0) throw { message: 'Le quedan 2 intentos', code: 400, valid: true };
			//
			else if (block === 1) throw { message: 'Le queda 1 intento', code: 400, valid: true };
			//
			else if (block === 2) throw { message: 'usuario bloqueado', code: 400, valid: true };
			//
			else if (block > 2) throw { message: 'usuario bloqueado', code: 400 };
		}

		if (block > 2) throw { message: 'usuario bloqueado', code: 400 };
		else if (block < 3 && block > 0) {
			// validamos si esta bloqueado
			await getRepository(fm_worker)
				.createQueryBuilder()
				.update(fm_worker)
				.set({ block: 0 })
				.where('email = :email', { email })
				.execute();
		}

		const token = generateToken(id, id_department, id_rol);

		res.status(200).json({
			message: 'Info del trabajador',
			info: dataWorker(data_user, id_department, id_rol, permiss, views),
			token,
		});
	} catch (err: any) {
		if (err.valid) await block(email);
		next(err);
	}
};

// this function is for emit a mail for edit a password
export const passMail = async (
	req: Request<any, Api.Resp, fm_worker>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		// define email
		const { email } = req.body;
		// query for valid email
		const worker = await getRepository(fm_worker).findOne({ where: { email } });
		if (!worker) throw { message: `El correo ${email} no se encuentra registrado en la plataforma`, code: 400 };

		// emit mail
		await mail.newPass(worker);

		// Response
		res.status(200).json({ message: 'Le hemos enviado un correo electrónico para recuperar su contraseña' });
	} catch (err) {
		next(err);
	}
};

// editar usuarios
export const editPass = async (
	req: Request<Api.params, Api.Resp, fm_worker>,
	res: Response<Api.Resp>,
	next: NextFunction
): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(`${req.body.password}`, salt);

		// define email
		const { password } = req.body;
		const { id }: any = req.headers.token;

		// query for valid email
		await getRepository(fm_worker)
			.createQueryBuilder()
			.update(fm_worker)
			.set({ password })
			.where('id = :id', { id })
			.execute();

		// Response
		res.status(200).json({ message: 'Contraseña actualizada con exito' });
	} catch (err) {
		next(err);
	}
};
