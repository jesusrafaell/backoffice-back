<<<<<<< HEAD
import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import FM from './fm.routes';
import Status from './status.routes';

//
export default (app: Application) => {
	app.use(FM);
	app.use(Status);
};
=======
import { Application } from 'express';

// rputers
// import auth from './auth/auth.routes';
import FM from './fm.routes';
import Status from './status.routes';

//
export default (app: Application) => {
	app.use(FM);
	app.use(Status);
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
