<<<<<<< HEAD
import ident_type from './ident_type';
import payment_method from './payment_method';
import roles from './roles';
import worker from './worker';
import activity from './activity';
import Product from './product';
import estado from './estado';
import municipio from './municipio';
import parroquia from './parroquia';
import ciudad from './ciudad';
import company from './company';
import department from './department';
import status_request from './status_request';
import type_request from './type_request';
import bank from './bank';
import type_person from './type_person';
import afiliados from './afiliados';
import type_payment from './type_payment';
import request_origin from './request_origin';
import telemercadeo from './telemercadeo';
import { createConnection } from 'typeorm';
import type_telemarket from './type_telemarket';
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
=======
import ident_type from './ident_type';
import payment_method from './payment_method';
import roles from './roles';
import worker from './worker';
import activity from './activity';
import Product from './product';
import estado from './estado';
import municipio from './municipio';
import parroquia from './parroquia';
import ciudad from './ciudad';
import company from './company';
import department from './department';
import status_request from './status_request';
import type_request from './type_request';
import bank from './bank';
import type_person from './type_person';
import afiliados from './afiliados';
import type_payment from './type_payment';
import request_origin from './request_origin';
import { createConnection } from 'typeorm';
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
});
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
