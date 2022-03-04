<<<<<<< HEAD
import { Application } from 'express';
import Admitions from './admitions.routes';
import Deparments from './generalt.routes';

export default (app: Application) => {
	app.use('/department/', Admitions);
	app.use( Deparments);
};
=======
import { Application } from 'express';
import Admitions from './admitions.routes';
import Deparments from './generalt.routes';

export default (app: Application) => {
	app.use('/department/', Admitions);
	app.use( Deparments);
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
