<<<<<<< HEAD
import { Application } from 'express';

// rputers
import location from './location.routes';
import Payments from './paymed.routes';
import global from './global.routes';
import Product from './product.routes';

//
export default (app: Application) => {
	app.use(location);
	app.use(global);
	app.use(Payments);
	app.use(Product);
};
=======
import { Application } from 'express';

// rputers
import location from './location.routes';
import Payments from './paymed.routes';
import global from './global.routes';
import Product from './product.routes';

//
export default (app: Application) => {
	app.use(location);
	app.use(global);
	app.use(Payments);
	app.use(Product);
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
