// app's
import services from './services';
import { createConnection, getRepository } from 'typeorm';
import fm_request from './db/models/fm_request';
import fm_dir_pos from './db/models/fm_dir_pos';
// init server

createConnection()
	.then(async () => {
		const sv = services.find((service: any): boolean => {
			const keySer: string = service.key;

			if (!process.env.npm_lifecycle_event) return false;
			const key = process.env.npm_lifecycle_event.replace(/(serve:|start:)/i, '');

			return keySer === key;
		});

		const { app, key } = sv;

		app.listen(app.get('port'), () => {
			console.log('____________________________________________________________________________');
			console.log('');
			console.log('██████╗  █████╗  ██████╗██╗  ██╗ ██████╗ ███████╗███████╗██╗ ██████╗███████╗');
			console.log('██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔═══██╗██╔════╝██╔════╝██║██╔════╝██╔════╝');
			console.log('██████╔╝███████║██║     █████╔╝ ██║   ██║█████╗  █████╗  ██║██║     █████╗  ');
			console.log('██╔══██╗██╔══██║██║     ██╔═██╗ ██║   ██║██╔══╝  ██╔══╝  ██║██║     ██╔══╝');
			console.log('██████╔╝██║  ██║╚██████╗██║  ██╗╚██████╔╝██║     ██║     ██║╚██████╗███████╗');
			console.log('╚═════╝ ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚═╝     ╚═╝ ╚═════╝╚══════╝ ');
			console.log(`Run "${key}" in Port:${app.get('port')}`);
			console.log('____________________________________________________________________________');
		});
	})
	.catch((err) => console.log('DB ERR', err));

/*
			console.log('   ╔═══╗ ♪');
			console.log('   ║███║ ♫');
			console.log('   ║ (●) ♫');
			console.log('   ╚═══╝♪♪');
			console.log(`Run "${key}" in http://localhost:${app.get('port')}`);
	*/
