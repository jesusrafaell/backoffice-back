import { Response, NextFunction, Request } from 'express';
import { Doc } from '../../../hooks/docs';
import { getRepository, In } from 'typeorm';
import fm_photo from '../../../db/models/fm_photo';
import { Api } from '../../../interfaces';
import { base } from '../../../hooks/docs/doc';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import fm_request from '../../../db/models/fm_request';
import fm_client from '../../../db/models/fm_client';
import fm_commerce from '../../../db/models/fm_commerce';
import fm_valid_request from '../../../db/models/fm_valid_request';
import fm_status from '../../../db/models/fm_status';
import fm_commerce_constitutive_act from '../../../db/models/fm_commerce_constitutive_act';
import fm_planilla from '../../../db/models/fm_planilla';

export const upFileRecaudos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { filename }: any = req.file;
		const { user } = req.body;
		const path = await Doc.Move(filename, user);

		const data = getRepository(fm_photo).create({ name: filename, path });
		const info = await getRepository(fm_photo).save(data);

		res.status(200).json({ message: 'archivo subidor', info });
	} catch (err) {
		next(err);
	}
};

// subir varias imagenes
export const upFilesRecaudos = async (
	req: Request<any, Api.Resp, Api.RC>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const files: any = req.files;
		let info: any = {};

		// definimos los ids de cliente y comercio
		const { id_client, id_commerce }: any = req.body;

		// lista dereacudos
		const description = ['rc_ref_bank', 'rc_rif', 'rc_ident_card', 'rc_special_contributor', 'rc_comp_dep'];

		// query que retorna el ultimo fm con ese comercio y cliente
		const fm: any = await getRepository(fm_request).findOne({
			where: { id_client },
			order: { id: 'ASC' },
			relations: [
				'rc_ref_bank',
				'id_client',
				'id_client.rc_ident_card',
				'id_commerce',
				'id_commerce.rc_constitutive_act',
				'id_commerce.rc_rif',
				'id_commerce.rc_special_contributor',
				'rc_comp_dep',
			],
		});
		if (fm && fm.id_client) {
			const { id_commerce, id_client } = fm;
			const { rc_ident_card }: any = id_client;
			const { rc_special_contributor, rc_constitutive_act, rc_ref_bank, rc_rif }: any = id_commerce;

			if (fm.id_commerce === id_commerce) {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					rc_rif: rc_rif && rc_rif.id,
					rc_special_contributor: rc_special_contributor && rc_special_contributor.id,
					rc_ref_bank: rc_ref_bank && rc_ref_bank.id,
					rc_constitutive_act: rc_constitutive_act ? rc_constitutive_act.map((item: any) => item.id) : [],
					planilla: [],
				};
			} else {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					planilla: [],
				};
			}
		} else {
			info = {
				rc_constitutive_act: [],
				planilla: [],
			};
		}

		// validamos la lista de imagenes
		const v_descript = files.images.filter((file: any) => description.includes(file.originalname)).length;

		// filtramos si envia imagenes con nobres no validos
		if (v_descript) throw { message: `${v_descript} imagenes no tiene un nombre referente a un recaudo` };

		// validamos que exista la carpeta corespondiente
		if (!existsSync(`${base}/${id_client}`)) await fs.mkdir(`${base}/${id_client}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}`)) await fs.mkdir(`${base}/${id_client}/${id_commerce}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}/constitutive_act`)) {
			await fs.mkdir(`${base}/${id_client}/${id_commerce}/constitutive_act`);
		}

		if (files.planilla) {
			if (!existsSync(`${base}/${id_client}/${id_commerce}/planilla`)) {
				await fs.mkdir(`${base}/${id_client}/${id_commerce}/planilla`);
			}
		}

		const stop: Promise<void>[] = files.images
			.filter((file: Express.Multer.File) => {
				const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
				//console.log(' description.includes(val`id)', description.includes(valid));

				return description.includes(valid);
			})
			.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				const descript: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');

				const route_ids: string = ['rc_ident_card'].includes(descript)
					? `${id_client}`
					: `${id_client}/${id_commerce}`;

				await Doc.Move(file.filename, route_ids);
				const path = `static/${route_ids}/${file.filename}`;

				const data = getRepository(fm_photo).create({ name: file.filename, path, descript });
				const save = await getRepository(fm_photo).save(data);

				info[descript] = save.id;
			});
		await Promise.all(stop);

		if (files.planilla) {
			const stop2 = files.planilla.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				await Doc.Move(file.filename, `${id_client}/${id_commerce}/planilla`);
				const path = `static/${id_client}/${id_commerce}/planilla/${file.filename}`;

				const data = getRepository(fm_photo).create({
					name: file.filename,
					path,
					descript: 'planilla',
				});
				const save = await getRepository(fm_photo).save(data);

				info.planilla.push(save.id);
			});

			await Promise.all(stop2);
		}

		if (files.constitutive_act) {
			const stop2 = files.constitutive_act.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				await Doc.Move(file.filename, `${id_client}/${id_commerce}/constitutive_act`);
				const path = `static/${id_client}/${id_commerce}/constitutive_act/${file.filename}`;

				const data = getRepository(fm_photo).create({
					name: file.filename,
					path,
					descript: 'rc_constitutive_act',
				});
				const save = await getRepository(fm_photo).save(data);

				info.rc_constitutive_act.push(save.id);
			});

			await Promise.all(stop2);
		}

		res.status(200).json({ message: 'archivos listos', info });
	} catch (err) {
		next(err);
	}
};

// editar recaudos de diferido
export const editRcByFm = async (
	req: Request<Api.pFM, Api.Resp, { constitutive_act_ids: string }>,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const constitutive_act_ids = req.body.constitutive_act_ids.split(',');
		//console.log('constitutive_act_ids', constitutive_act_ids);

		const { id_request } = req.params;
		const files: any = req.files;

		//console.log('files', req.files);

		const fm: any = await getRepository(fm_request).findOne({
			where: { id: id_request },
			order: { id: 'ASC' },
			relations: [
				'rc_ref_bank',
				'id_client',
				'id_client.rc_ident_card',
				'id_commerce',
				'id_commerce.rc_constitutive_act',
				'id_commerce.rc_constitutive_act.id_photo',
				'id_commerce.rc_rif',
				'id_commerce.rc_special_contributor',
				'rc_comp_dep',
			],
		});
		if (!fm) throw { message: 'el FM suministrado no existe', code: 400 };

		//console.log('--------|>');

		const { id_client, id_commerce } = fm;

		// console.log('id_client}/${id_commerce',id_client,id_commerce);

		const description = [
			'rc_constitutive_act',
			'rc_ref_bank',
			'rc_rif',
			'rc_ident_card',
			'rc_special_contributor',
			'rc_comp_dep',
		];

		let valids: any = {};

		let info: any = {
			rc_ident_card: id_client.rc_ident_card,
			rc_rif: id_commerce.rc_rif,
			rc_special_contributor: id_commerce.rc_special_contributor,
			rc_ref_bank: fm.rc_ref_bank,
			rc_constitutive_act: id_commerce.rc_constitutive_act,
		};

		if (files.images) {
			const stop: Promise<void>[] = files.images
				.filter((file: Express.Multer.File): boolean => {
					const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
					return description.includes(valid);
				})
				.map(async (file: Express.Multer.File, i: number): Promise<void> => {
					const descript: any = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');

					if (info[descript]) {
						await Doc.Delete(info[descript].path);

						if (['rc_ident_card'].includes(descript)) {
							const route_ids: string = `${id_client.id}`;

							const path = `static/${route_ids}/${file.filename}`;

							await getRepository(fm_photo).update(id_client[descript].id, { path, name: file.filename });

							valids[descript.replace('rc_', 'valid_')] = '';
						} else if (!['rc_constitutive_act'].includes(descript)) {
							const route_ids: string = `${id_client.id}/${id_commerce.id}`;

							const path = `static/${route_ids}/${file.filename}`;

							await getRepository(fm_photo).update(id_commerce[descript].id, { path });

							valids[descript.replace('rc_', 'valid_')] = '';
						}
					}
				});

			await Promise.all(stop);
		}

		if (files.constitutive_act) {
			//console.log('--------|> constitutive_act');

			//console.log('files.constitutive_act', files.constitutive_act);

			const stop2 = files.constitutive_act.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				//console.log('file', file);

				await Doc.Move(file.filename, `${id_client}/${id_commerce}/constitutive_act`);
				const path = `static/${id_client}/${id_commerce}/constitutive_act/${file.filename}`;

				const data = getRepository(fm_photo).create({
					name: file.filename,
					path,
					descript: 'rc_constitutive_act',
				});

				//console.log('data', data);

				const save = await getRepository(fm_photo).save(data);

				//console.log('save', save);

				info.rc_constitutive_act.push(save.id);
			});

			await Promise.all(stop2);
		}

		//console.log('--------|> constitutive_act_ids');

		if (req.body.constitutive_act_ids) {
			const imgs = await getRepository(fm_photo).findByIds(constitutive_act_ids);
			//
			const stop = imgs.map(async (file: any): Promise<number> => {
				await fs.unlink(file.path);

				return file.id;
			});

			const ids = await Promise.all(stop);

			await getRepository(fm_photo).delete(ids);

			await getRepository(fm_commerce_constitutive_act).delete({ id_commerce, id_photo: In(ids) });
		}

		await getRepository(fm_status).update({ id_request: fm.id, id_department: 4 }, { id_status_request: 3 });

		res.status(200).json({ message: 'imagenes editadas' });
	} catch (err) {
		next(err);
	}
};

const notRemove = (file: any, data: any) => {
	for (const item of Object.entries(data)) {
		if (item[0] === file.originalname.split('.')[0]) {
			return false;
		}
	}
	return true;
};

const removeFilesFromList = (files: any, data: any) => {
	const list: any[] = [];
	console.log(files.length);
	for (let i = 0; i < files.length; i++) {
		if (notRemove(files[i], data)) {
			//console.log('add', files[i].originalname);
			list.push(files[i]);
		}
	}
	return list;
};

//Creacion de images from FM
// subir varias imagenes
export const upFilesRecaudosFM = async (files: any, id_client: number, id_commerce: number, id_fm: number) => {
	try {
		let info: any = {};

		// lista dereacudos
		const description = ['rc_ref_bank', 'rc_rif', 'rc_ident_card', 'rc_special_contributor', 'rc_comp_dep'];

		// query que retorna el ultimo fm con ese comercio y cliente
		const fmClient: any = await getRepository(fm_request).findOne({
			where: { id_client },
			order: { id: 'ASC' },
			relations: [
				'rc_ref_bank',
				'id_client',
				'id_client.rc_ident_card',
				'id_commerce',
				'id_commerce.rc_constitutive_act',
				'id_commerce.rc_rif',
				'id_commerce.rc_special_contributor',
				'rc_comp_dep',
			],
		});
		const fmCommerce: any = await getRepository(fm_request).findOne({
			where: { id_client, id_commerce },
			order: { id: 'ASC' },
			relations: [
				'rc_ref_bank',
				'id_client',
				'id_client.rc_ident_card',
				'id_commerce',
				'id_commerce.rc_constitutive_act',
				'id_commerce.rc_rif',
				'id_commerce.rc_special_contributor',
				'rc_comp_dep',
			],
		});
		const fm = fmCommerce ? fmCommerce : fmClient;

		if (fm && fm.id_client) {
			//console.log('llegue client');
			const fmClient = fm.id_client;
			const fmCommerce = fm.id_commerce;
			const { rc_ident_card }: any = fmClient;
			const { rc_special_contributor, rc_constitutive_act, rc_rif }: any = fmCommerce;

			if (fm.id_commerce.id === id_commerce) {
				//console.log('llegue commerce');
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					rc_rif: rc_rif && rc_rif.id,
					rc_special_contributor: rc_special_contributor && rc_special_contributor.id,
					rc_constitutive_act: rc_constitutive_act ? rc_constitutive_act.map((item: any) => item.id) : [],
					planilla: [],
				};
			} else {
				info = {
					rc_ident_card: rc_ident_card && rc_ident_card.id,
					planilla: [],
				};
			}
		} else {
			info = {
				rc_constitutive_act: [],
				planilla: [],
			};
		}

		// validamos la lista de imagenes
		const v_descript = files.images.filter((file: any) => description.includes(file.originalname)).length;

		// filtramos si envia imagenes con nobres no validos
		if (v_descript) throw { message: `${v_descript} imagenes no tiene un nombre referente a un recaudo` };

		// validamos que exista la carpeta corespondiente
		if (!existsSync(`${base}/${id_client}`)) await fs.mkdir(`${base}/${id_client}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}`)) await fs.mkdir(`${base}/${id_client}/${id_commerce}`);

		if (!existsSync(`${base}/${id_client}/${id_commerce}/constitutive_act`)) {
			await fs.mkdir(`${base}/${id_client}/${id_commerce}/constitutive_act`);
		}

		if (files.planilla) {
			if (!existsSync(`${base}/${id_client}/${id_commerce}/planilla`)) {
				await fs.mkdir(`${base}/${id_client}/${id_commerce}/planilla`);
			}
		}

		//console.log('origenfiles', files.images);
		const auxFiles = removeFilesFromList(files.images, info);
		//console.log('auxfiles ', auxFiles.length);

		const stop: Promise<void>[] = auxFiles
			.filter((file: Express.Multer.File) => {
				const valid: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');
				//console.log(' description.includes(val`id)', description.includes(valid));

				return description.includes(valid);
			})
			.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				//console.log('aqui', file);
				const descript: string = file.originalname.replace(/(.png$|.png$|.jpeg$|.pdf$|.jpg$)/g, '');

				const route_ids: string = ['rc_ident_card'].includes(descript)
					? `${id_client}`
					: `${id_client}/${id_commerce}`;

				await Doc.Move(file.filename, route_ids);
				const path = `static/${route_ids}/${file.filename}`;

				const data = getRepository(fm_photo).create({ name: file.filename, path, descript });
				const save = await getRepository(fm_photo).save(data);

				info[descript] = save.id;
			});
		await Promise.all(stop);

		if (files.planilla) {
			const stop2 = files.planilla.map(async (file: Express.Multer.File, i: number): Promise<void> => {
				await Doc.Move(file.filename, `${id_client}/${id_commerce}/planilla`);
				const path = `static/${id_client}/${id_commerce}/planilla/${file.filename}`;

				const data = getRepository(fm_photo).create({
					name: file.filename,
					path,
					descript: 'planilla',
				});
				const save = await getRepository(fm_photo).save(data);

				info.planilla.push(save.id);
			});

			await Promise.all(stop2);
		}

		if (!fm.id_commerce.rc_constitutive_act) {
			if (files.constitutive_act) {
				const stop2 = files.constitutive_act.map(async (file: Express.Multer.File, i: number): Promise<void> => {
					await Doc.Move(file.filename, `${id_client}/${id_commerce}/constitutive_act`);
					const path = `static/${id_client}/${id_commerce}/constitutive_act/${file.filename}`;

					const data = getRepository(fm_photo).create({
						name: file.filename,
						path,
						descript: 'rc_constitutive_act',
					});
					const save = await getRepository(fm_photo).save(data);

					info.rc_constitutive_act.push(save.id);
				});

				await Promise.all(stop2);
			}
		}

		//save Images in Client
		if (!fm.id_client.rc_ident_card) {
			await getRepository(fm_client).update(id_client, { rc_ident_card: info.rc_ident_card });
		}
		//save Images in Commerce
		if (fm.id_commerce !== id_commerce) {
			if (!fm.id_commerce.rc_special_contributor || !fm.id_commerce.rc_rif)
				await getRepository(fm_commerce).update(id_commerce, {
					rc_special_contributor: info.rc_special_contributor,
					rc_rif: info.rc_rif,
				});
			if (!fm.id_commerce.rc_constitutive_act) {
				const constitutive_act = info.rc_constitutive_act.map((id_photo: any) => ({ id_commerce, id_photo }));
				await getRepository(fm_commerce_constitutive_act).save(constitutive_act);
			}
		}

		//save Imagen in FM
		if (info.planilla) {
			const rc_planilla = info.planilla.map((id_photo: number) => ({ id_request: id_fm, id_photo }));
			await getRepository(fm_planilla).save(rc_planilla);
		}

		await getRepository(fm_request).update(id_fm, {
			rc_comp_dep: info.rc_comp_dep,
			rc_ref_bank: info.rc_ref_bank,
		});

		return {
			...info,
			okey: true,
		};
	} catch (err) {
		return err;
	}
};
