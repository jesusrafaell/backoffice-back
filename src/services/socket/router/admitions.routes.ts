import { off } from 'process';
import {
	diferido,
	disconect,
	getDiferido,
	listDiferido,
	listSolic,
	listSolicWorking,
	solicitudesTrabajando,
	diferidoTranbajando,
	getDash,
	solicitudes,
	All_Info,
	allSolic,
	allTerm,
	listDiferidoWorking,
	disconectsolic,
	OneSolic,
	OneSolicCommerce,
	moveSolicWorking,
} from '../controllers/admition';

const admitions = (io: any) => {
	io.on('connection', (socket: any) => {
		//// // console.log(socket.handshake.url);
		console.log(`nuevo socket connectado: ${socket.id} `);

		socket.on('client:prueba', async () => {
			console.log('Prueba de emision');
			// await listSolic();
			let data = 'mano funciona';
			io.emit('server:prueba', data);
		});

		socket.on('client:atrabajar', async (user: any) => {
			const solic = await listSolicWorking(socket.id, user);

			socket.emit('server:atrabajar', solic);

			io.emit('server:solicitudes', solicitudes);
			io.emit('server:dashdata', getDash());
			io.emit('server:solicitudesTrabajando', solicitudesTrabajando);

			//console.log('En espera admision ', getDash());
			console.log('En espera Admision', solicitudes.length);
			console.log('Trabajando Admision', solicitudesTrabajando.length);
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

		socket.on('cliente:newSolic', async () => {
			await listSolic();
			await io.emit('server:solicitudes', solicitudes);
			//console.log('total solic', solicitudes.length);
		});

		socket.on('cliente:disconnect', async () => {
			console.log('Disconnect');
			disconect(socket.id);
			disconectsolic(socket.id);
			await listDiferido();
			await listSolic();
			//
			const todo = await All_Info();
			const todos = getDash();
			await io.emit('server:solicitudes', solicitudes);
			await io.emit('server:solicitudesTrabajando', solicitudesTrabajando);
			await io.emit('server:diferidoTranbajando', diferidoTranbajando);
			await io.emit('server:loadDiferidos', diferido);
			await io.emit('server:dashdata', todos);
			await io.emit('server:todos', todo);
		});

		socket.on('disconnect', async () => {
			// console.log('Disconnect');

			disconect(socket.id);
			disconectsolic(socket.id);
			await listDiferido();
			await listSolic();
			const todo = await All_Info();
			const todos = getDash();
			io.emit('server:solicitudes', solicitudes);
			io.emit('server:solicitudesTrabajando', solicitudesTrabajando);
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

		socket.on('cliente:buscarSolic', async (data: any, callback: any) => {
			const { user, key } = data;
			const one: any = await OneSolic(key);
			if (one.ok) {
				await moveSolicWorking(socket.id, user, one.solic);
				console.log('colear fm', one);
				callback(one);
			} else {
				console.log('error', one.err);
				callback(one);
			}
		});

		socket.on('cliente:buscarSolicXCommerce', async (data: any, callback: any) => {
			const { user, key } = data;
			const one: any = await OneSolicCommerce(key);
			if (one.ok) {
				await moveSolicWorking(socket.id, user, one.solic);
				console.log('obtener fm', one.solic);
				callback(one);
			} else {
				console.log('error', one.err);
				callback(one);
			}
		});
	});
};

export default admitions;
