import fm_department from 'db/models/fm_department';
import fm_roles from 'db/models/fm_roles';
import jwt from 'jsonwebtoken';

export default function generateToken(id: number, id_department: fm_department, id_rol: fm_roles) {
	//console.log('Crear token para dep:', id_department, ', rol: ', id_rol);
	return jwt.sign({ id, idDep: id_department, idRol: id_rol }, `${process.env.KEY}`, {
		expiresIn: process.env.TIME_TOKEN,
	});
}

export const generateTokenFromToken = (token: string) => {
	return jwt.sign(token, `${process.env.KEY}`, { expiresIn: process.env.TIME_TOKEN });
};
