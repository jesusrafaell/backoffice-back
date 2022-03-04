<<<<<<< HEAD
import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import RC from './RC.routes';
import Global from './global.routes';

//
export default (app: Application) => {
	app.use('/1000pagosRC', RC);
	app.use(Global);
};
=======
import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import RC from './RC.routes';
import Global from './global.routes';

//
export default (app: Application) => {
	app.use('/1000pagosRC', RC);
	app.use(Global);
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
