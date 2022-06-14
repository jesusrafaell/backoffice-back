import {
	administracion,
	disconectAdminis,
	disconectsolicAdministra,
	getFmAdministration,
	listAdminisWorking,
} from '../controllers/administracion';

const administra = (io: any) => {
	io.on('connection', (socket: any) => {
		//socket.emit('PruebaAdmin', administracion);
		io.emit('server:loadAdministracion', administracion);

		//Devuelve
		socket.on('cliente:administrWorking', async (user: any, id: any) => {
			await listAdminisWorking(socket.id, user, id);

			console.log('En espera Administracion', administracion.length);
			console.log('Trabajando adminsitracion', listAdminisWorking.length);
			io.emit('server:loadAdministra', administracion);
		});

		socket.on('cliente:loadAdministracion', async () => {
			// console.log('Toy llegando aqui');

			socket.emit('server:loadAdministracion', administracion);
			// console.log(administracion);
		});
		socket.on('cliente:loadAdministracionTodos', async () => {
			// console.log('Toy llegando aqui');

			await getFmAdministration();
			io.emit('server:loadAdministracion', administracion);
			// console.log(administracion);
		});

		socket.on('cliente:trabajandoAdministra', async (user: any, id: any) => {
			// console.log('administra trabajando');
			// console.log('');

			await listAdminisWorking(socket.id, user, id);

			io.emit('server:loadAdministracion', administracion);

			// console.log('Administra desp: ', administracion);
		});

		socket.on('disconnect', async () => {
			// console.log(socket.id, 'disconnected');
			// console.log('FUera');

			disconectAdminis(socket.id);
			await getFmAdministration();
			io.emit('server:loadAdministracion', administracion);
		});

		socket.on('cliente:disconnectAdministracion', async () => {
			// console.log(socket.id, 'disconnected');
			console.log('Disconnec Administra');
			disconectAdminis(socket.id);
			await getFmAdministration();
			io.emit('server:loadAdministracion', administracion);
		});

		socket.on('cliente:cleansolicadminis', async () => {
			await getFmAdministration();
			disconectsolicAdministra(socket.id);
		});
	});
};

export default administra;
