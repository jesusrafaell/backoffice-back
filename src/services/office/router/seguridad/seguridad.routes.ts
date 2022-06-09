import { Router } from 'express';
import {
	getDepartments,
	getRoles,
	getPermissions,
	updatePermissions,
	getViews,
	updateViews,
	updateDepartment,
	createDepartment,
} from '../../controllers/seguridad';

const Seguridad: Router = Router();
//

Seguridad.route('/departments').get(getDepartments).put(updateDepartment);
//
Seguridad.route('/roles').get(getRoles);
//
//Permisos
//
Seguridad.route('/department/create').post(createDepartment);
//
Seguridad.route('/permissions/:id_dep/:id_rol').get(getPermissions).post(updatePermissions);
//
Seguridad.route('/views/:id_dep').get(getViews).post(updateViews);

export default Seguridad;
