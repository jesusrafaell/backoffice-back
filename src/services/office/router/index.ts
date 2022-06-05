import { Application } from 'express';

// rputers
import auth from './auth';
import deparments from './deparments';
import FM from './fm';
import global from './global';
import commerces from './commerces';
import updateData from './updateData';
import seguridad from './seguridad';
import activacion from './activacion';
//
export default (app: Application) => {
	auth(app);
	global(app);
	FM(app);
	deparments(app);
	commerces(app);
	updateData(app);
	seguridad(app);
	activacion(app);
	//
};
