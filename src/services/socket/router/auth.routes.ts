import { getWorkerFromEmail } from '../controllers/authsocket';

const authSocket = (io: any) => {
	io.on('connection', (socket: any) => {
		console.log(`nuevo socket connectado registro: ${socket.id} `);

		socket.on('client:registered', async (email: string) => {
			//const newUser = await getWorkerFromEmail(email);
			//console.log('nuevo', newUser);
			io.emit('server:reloadWorkers');
		});
	});
};

export default authSocket;
