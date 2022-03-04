// Modules
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';

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
	});
});
