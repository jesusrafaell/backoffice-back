import { createConnection } from 'typeorm';
import activity from './activity';
import afiliados from './afiliados';
import bank from './bank';
import company from './company';
import department from './department';
import access_views from './access.views';
import ger7_parametrization from './get7_parametrization';
import ident_type from './ident_type';
import payment_method from './payment_method';
import actions from './actions';
import permissions from './permissions';
import Product from './product';
import request_origin from './request_origin';
import roles from './roles';
import status_photo from './status_photo';
import status_request from './status_request';
import telemercadeo from './telemercadeo';
import type_diferido from './type_diferido';
import type_payment from './type_payment';
import type_person from './type_person';
import type_request from './type_request';
import type_telemarket from './type_telemarket';
import views from './views';
import wallet_bank from './Wallet_bank';
import worker from './worker';
// init server

createConnection().then(async () => {
	await type_request();
	await ident_type();
	await payment_method();
	await type_payment();
	await company();
	await Product();
	await bank();
	await type_person();
	await afiliados();
	await activity();
	await request_origin();
	await type_telemarket();
	await telemercadeo();
	await type_diferido();
	await ger7_parametrization();
	await status_photo();
	await status_request();
	await wallet_bank();
	//de ultimo
	await roles();
	await department();
	await views();
	await actions();
	//relaciones
	await access_views();
	await permissions();
	//nosotros prueba
	await worker();
});
