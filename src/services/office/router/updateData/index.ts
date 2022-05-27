import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import UpdateCommerce from './UpdateCommerce.routes';

//
export default (app: Application) => {
	app.use('/edit', UpdateCommerce);
};
