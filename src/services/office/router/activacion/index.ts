import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import Activacion from './activacion.routes';

//
export default (app: Application) => {
	app.use('/activacion', Activacion);
};
