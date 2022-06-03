import { Router } from 'express';
import {
	getDepartments,
	getRoles,
	getPermissions,
	updatePermissions,
	getViews,
	updateViews,
} from '../../controllers/seguridad';

const Seguridad: Router = Router();
//
//Permisos
Seguridad.route('/departments').get(getDepartments);
//
Seguridad.route('/roles').get(getRoles);
//
Seguridad.route('/permissions/:id_dep/:id_rol').get(getPermissions).post(updatePermissions);
//
Seguridad.route('/views/:id_dep').get(getViews).post(updateViews);

export default Seguridad;
