import { createConnection } from 'typeorm';
import activity from './activity';
import afiliados from './afiliados';
import bank from './bank';
import ciudad from './ciudad';
import company from './company';
import department from './department';
import estado from './estado';
import ident_type from './ident_type';
import municipio from './municipio';
import parroquia from './parroquia';
import payment_method from './payment_method';
import Product from './product';
import request_origin from './request_origin';
import roles from './roles';
import status_request from './status_request';
import telemercadeo from './telemercadeo';
import type_payment from './type_payment';
import type_person from './type_person';
import type_request from './type_request';
import type_telemarket from './type_telemarket';
import worker from './worker';
// init server

createConnection().then(async () => {
	await status_request();
	await type_request();
	await ident_type();
	await roles();
	await payment_method();
	await type_payment();
	await company();
	await department();
	await worker();
	await Product();
	await estado();
	await municipio();
	await parroquia();
	await ciudad();
	await bank();
	await type_person();
	await afiliados();
	await activity();
	await request_origin();
	await type_telemarket();
	await telemercadeo();
});
