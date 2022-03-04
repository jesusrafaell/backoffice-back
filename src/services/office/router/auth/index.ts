<<<<<<< HEAD
import { Application } from 'express';
import Worker from './worker.routes';
import Auth from './auth.routes';

//
export default (app: Application) => {
	app.use('/auth', Auth);
	app.use(Worker);
};
=======
import { Application } from 'express';
import Worker from './worker.routes';
import Auth from './auth.routes';

//
export default (app: Application) => {
	app.use('/auth', Auth);
	app.use(Worker);
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
