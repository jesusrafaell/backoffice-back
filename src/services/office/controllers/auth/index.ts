// modules
import { NextFunction, Request, Response } from 'express';

import { getRepository } from 'typeorm';
import { validationResult } from 'express-validator';

// services and hooks and personal interface
import { Api } from '../../../../interfaces';
import { mail } from '../../../../helpers';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// db talbes
import fm_worker from '../../../../db/models/fm_worker';
import fm_permissions from '../../../../db/models/fm_permissions';
import generateToken from '../../../../utilis/generateToken';
import { DataUser, dataWorker, getPermiss, getViews } from './utils.ts';
import { saveLogs } from '../../../../utilis/logs';

const { transporter } = require('../../mail/mail.js');

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
		console.log('save in logx');
		await saveLogs(id, 'POST', '/auth/register', `Registro de usuario: ${email}`);

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
		if (!id_department.active)
			throw { message: `El departamento de ${id_department.name} esta Bloqueado`, code: 401 };
		const views = getViews(access_views); //obtener lista de vistas

		let permiss: any = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss = await getRepository(fm_permissions).find({
				where: { id_department: id_department.id, id_rol: id_rol.id },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = getPermiss(resPermiss);

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
			await getRepository(fm_worker).update(id, {
				block: 0,
			});
		}

		const token = generateToken(id, id_department, id_rol);

		await saveLogs(id, 'POST', '/auth/login', `Login de usuario: ${email}`);

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

//Envio de correo para nuevo password
export const getmail = async (
	req: Request<
		Api.params,
		Api.Resp,
		{ email: string; userWebTipoIdentificacion: string; userWebIdentificacion: string }
	>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { email } = req.body;
		// console.log('Email:', email);
		// encript password
		const resWorker = await getRepository(fm_worker).findOne({
			where: { email },
			relations: ['id_rol', 'id_department', 'id_department.access_views', 'id_department.access_views.id_views'],
		});
		// console.log('ResWorker: ', resWorker);

		if (!resWorker) throw { message: 'El email no existe', code: 400 };

		const { id_department: dep, id_rol, ...worker }: any = resWorker;
		const { access_views, ...id_department }: any = dep;

		// extraemos data
		const { id }: any = worker;

		// Generar JWT
		// console.log('Info: ', id, id_department, id_rol);
		const token = generateToken(id, id_department, id_rol);

		//ya la query esta aqui phonesClientconst prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
		const prod = process.argv[0] === '/root/.nvm/versions/node/v14.15.0/bin/node';
		const URL_WEB = prod
			? `http://localhost:3000/auth/restore-password/?token=`
			: `http://localhost:3000/auth/restore-password/?token=`;
		const link = URL_WEB + token;

		// Step 3
		const info = await transporter.sendMail({
			from: 'no-reply@1000pagos.com', // TODO: email sender
			to: email, // TODO: email receiver
			subject: 'Aldrin Informa',
			//cc: 'aetours.ca@gmail.com',
			// text: 'Wooohooo it works!!',
			// template: '../apipuntoconsulta/views/forgetPass',
			template: 'index',
			context: {
				link: link,
			}, // send extra values to template
		});

		// const logs: any = {
		// 	descript: `[method:POST]::[path:/passrenew]::[msg:Envio de correo por contrasena]`,
		// 	email: email,
		// 	id_origin_logs: 4,
		// };

		// await getRepository(General_Logs).save(logs); //Guardando en Punto ConSulta

		res.status(200).json({
			ok: true,
			info: 'Mensaje enviado satisfactoriamente, revise su correo...',
		});
	} catch (err) {
		console.log('err', err);
		next(err);
	}
};

//Coloca nuevo password
export const newPass = async (
	req: Request<Api.params, Api.Resp, { password: string; token: any }>,
	res: Response<Api.Resp<DataUser>>,
	next: NextFunction
): Promise<void> => {
	try {
		// encript password
		const salt: string = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(`${req.body.password}`, salt);
		// define email
		const { password, token: token2 } = req.body;
		// const { id }: any = req.headers.token;
		const credentialsInToken = jwt.decode(token2);
		const { id }: any = credentialsInToken;
		// console.log('Id de where ', credentialsInToken, 'Passw0rd ', password);

		//Busca Id si existe
		const resWorker = await getRepository(fm_worker).findOne({
			where: { id },
			relations: ['id_rol', 'id_department', 'id_department.access_views', 'id_department.access_views.id_views'],
		});

		if (!resWorker) throw { message: 'correo o contraseña incorrecta', code: 400 };
		// console.log('Trabajdor', resWorker);
		// query for valid email
		await getRepository(fm_worker)
			.createQueryBuilder()
			.update(fm_worker)
			.set({ password })
			.where('id = :id', { id })
			.execute();

		const { id_department: dep, id_rol, ...worker }: any = resWorker;
		const { access_views, ...id_department }: any = dep;

		//console.log('dep', id_department.id, 'rol', id_rol.id);
		const views = getViews(access_views); //obtener lista de vistas

		let permiss: any = [];

		//buscar permisos
		if (id_department.id !== 1) {
			const resPermiss = await getRepository(fm_permissions).find({
				where: { id_department: id_department.id, id_rol: id_rol.id },
				relations: ['id_action'],
			});
			if (!resPermiss) throw { message: 'Error Access Permisses', code: 400 };

			permiss = getPermiss(resPermiss);

			//console.log(permiss);
		} else {
			console.log('usuario no posee nigun Permiso');
		}

		// extraemos data
		const { email, block, ...data_user }: any = worker;

		const token = generateToken(id, id_department, id_rol);
		console.log('token ', token);

		await saveLogs(id, 'POST', '/auth/login', `Cambio de contrasena: ${email}`);

		res.status(200).json({
			message: 'Info del trabajador',
			info: dataWorker(data_user, id_department, id_rol, permiss, views),
			token,
		});
	} catch (err) {
		next(err);
	}
};
