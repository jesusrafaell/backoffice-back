import { Router } from 'express';
import { getDepartments, getRoles, getPermissions, updatePermissions } from '../../controllers/seguridad';

const Seguridad: Router = Router();
//
Seguridad.route('/departments').get(getDepartments);
//
//
Seguridad.route('/roles').get(getRoles);
//
Seguridad.route('/permissions/:id_dep/:id_rol').get(getPermissions).post(updatePermissions);
//

export default Seguridad;
