import {
	diferido,
	disconect,
	getDiferido,
	listDiferido,
	listSolic,
	listSolicWorking,
	solictudesTrabajando,
	diferidoTranbajando,
	getDash,
	solictudes,
	All_Info,
	allSolic,
	allTerm,
	listDiferidoWorking,
	disconectsolic,
	OneSolic,
} from '../controllers/admition';

const admitions = (io: any) => {
	io.on('connection', (socket: any) => {
		//// // console.log(socket.handshake.url);
		console.log(`nuevo socket connectado: ${socket.id} `);

		// io.emit('server:solicitudes', solictudes);
		// io.emit('server:solictudesTrabajando', solictudesTrabajando);
		// io.emit('server:loadDiferidos', diferido);
		// io.emit('server:dashdata', getDash());

		socket.on('client:prueba', async () => {
			console.log('Prueba de emision');
			// await listSolic();
			let data = 'mano funciona';
			io.emit('server:prueba', data);
		});

		socket.on('client:atrabajar', async (user: any) => {
			const solic = await listSolicWorking(socket.id, user);

			socket.emit('server:atrabajar', solic);

			io.emit('server:solicitudes', solictudes);
			io.emit('server:dashdata', await getDash());
			io.emit('server:solictudesTrabajando', solictudesTrabajando);
		});

		socket.on('cliente:loadDiferidos', async () => {
			//// // console.log('Dimas es gayyyyy');
			await listDiferido();
			io.emit('server:loadDiferidos', diferido);
		});

		////Devuelve Toda las cantidades de Admision

		socket.on('cliente:todo', async (callback: any) => {
			const todos = await All_Info();
			callback(todos);

			//// // console.log('Toy aqui probando', todos);
		});

		socket.on('cliente:disconnect', async () => {
			console.log('Disconnect');
			disconect(socket.id);
			disconectsolic(socket.id);
			await listDiferido();
			await listSolic();
			console.log('Hay Soli', solictudes);
			console.log('diferidos', diferido);
			const todo = await All_Info();
			const todos = getDash();
			await io.emit('server:solicitudes', solictudes);
			await io.emit('server:solictudesTrabajando', solictudesTrabajando);
			await io.emit('server:diferidoTranbajando', diferidoTranbajando);
			await io.emit('server:loadDiferidos', diferido);
			await io.emit('server:dashdata', todos);
			await io.emit('server:todos', todo);
			// await listDiferido();
			// await listSolic();
		});

		socket.on('disconnect', async () => {
			// console.log('Disconnect');

			disconect(socket.id);
			disconectsolic(socket.id);
			await listDiferido();
			await listSolic();
			const todo = await All_Info();
			const todos = getDash();
			io.emit('server:solicitudes', solictudes);
			io.emit('server:solictudesTrabajando', solictudesTrabajando);
			io.emit('server:diferidoTranbajando', diferidoTranbajando);
			io.emit('server:loadDiferidos', diferido);
			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('Editar_diferido', async (id_request: number, callback: any) => {
			const diferido = await getDiferido(id_request);
			//console.log(diferido);
			callback(diferido);
		});

		socket.on('cliente:dashdata', async (callback: any) => {
			await listSolic();
			await listDiferido();
			const dash = getDash();
			callback(dash);
		});

		socket.on('cliente:dashdatasiempre', async () => {
			await listDiferido();
			const todos = getDash();
			io.emit('server:dashdata', todos);
		});

		//Modificado en casa para traer diferido
		socket.on('cliente:trabanjandoDiferido', async (user: any, id: any) => {
			const id_s = socket.id;
			const use = user;
			const id_d = id;

			const difTrabajando = await listDiferidoWorking(id_s, use, id_d);
			// console.log('Diftraba', difTrabajando);

			socket.emit('server:diferidostomado', difTrabajando);
			io.emit('server:diferidoTranbajando', diferidoTranbajando);
			io.emit('server:loadDiferidos', diferido);

			const todos = getDash();
			const todo = await All_Info();
			await listDiferido();

			io.emit('server:dashdata', todos);
			io.emit('server:todos', todo);
		});

		socket.on('cliente:coleado', async (key: any, callback: any) => {
			const one = await OneSolic(key);
			console.log('Coleado... :', one);
			callback(one);
		});
	});
};

export default admitions;
