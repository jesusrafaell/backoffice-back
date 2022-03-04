// Modules
import express, { Application, Request, Response } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';
import { createConnection } from 'typeorm';

import path from 'path';

const app: any = express();

// middleware preRoutes
preRoutes(app);
app.use(express.json());

// Routes
Routes(app);

//
app.use('/static', express.static(path.resolve('static')));

// meddleware posRutes

posRoutes(app);

// Settings

app.set('port', process.env.PORT_PROVIDERS || 8000);

createConnection().then(() => {
	app.listen(app.get('port'), () => {
<<<<<<< HEAD
		console.log('');

		console.log('████████╗███╗   ███╗███████╗███████╗   ');
		console.log('╚══██╔══╝████╗ ████║██╔════╝╚════██║   ');
		console.log('   ██║   ██╔████╔██║███████╗    ██╔╝   ');
		console.log('   ██║   ██║╚██╔╝██║╚════██║   ██╔╝    ');
		console.log('   ██║   ██║ ╚═╝ ██║███████║   ██║     ');
		console.log('   ╚═╝   ╚═╝     ╚═╝╚══════╝   ╚═╝     ');
		console.log('                                       ');
		console.log(' ██╗ ██████╗  ██████╗  ██████╗ ██████╗ ');
		console.log('███║██╔═████╗██╔═████╗██╔═████╗██╔══██╗');
		console.log('╚██║██║██╔██║██║██╔██║██║██╔██║██████╔╝');
		console.log(' ██║████╔╝██║████╔╝██║████╔╝██║██╔═══╝ ');
		console.log(' ██║╚██████╔╝╚██████╔╝╚██████╔╝██║     ');
		console.log(' ╚═╝ ╚═════╝  ╚═════╝  ╚═════╝ ╚═╝     ');

		console.log('');
		console.log(`TMS7 y Api1000P corriendo en el puerto ${app.get('port')}`);
=======
		console.log(`TMS7 corriendo en el puerto http://localhost:${app.get('port')} leoM   `);
		console.log('_________');
		console.log('|       |');
		console.log('| ()_() |');
		console.log(`| (o.o) |`);
		console.log('| (|_|)*|');
		console.log('|_______|');
		console.log('| DB OK |');
		console.log('|_______|');
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
	});
});
