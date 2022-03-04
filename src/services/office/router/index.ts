<<<<<<< HEAD
import { Application } from 'express';

// rputers
import auth from './auth';
import deparments from './deparments';
import FM from './fm';
import global from './global';
import commerces from './commerces';
//
export default (app: Application) => {
	auth(app);
	global(app);
	FM(app);
	deparments(app);
	commerces(app);
	//
};
=======
import { Application } from 'express';

// rputers
import auth from './auth';
import deparments from './deparments';
import FM from './fm';
import global from './global';
import commerces from './commerces';
//
export default (app: Application) => {
	auth(app);
	global(app);
	FM(app);
	deparments(app);
	commerces(app);
	//
};
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
