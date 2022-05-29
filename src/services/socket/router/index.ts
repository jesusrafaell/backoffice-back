import administra from './administracion.routes';
import admitions from './admitions.routes';
import authSocket from './auth.routes';

export default (io: any) => {
	admitions(io);
	administra(io);
	authSocket(io);
};
