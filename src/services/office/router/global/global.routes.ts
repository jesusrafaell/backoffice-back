import { Router } from 'express';
import {
	getAllIdent_type,
	getAllActivity,
	getAllTypeSolicts,
	getAllTiposDeCarteras,
	getAllTeleMarket,
	getAllTypePayment,
	getAllRequestSource,
	getAlldistribuidores,
} from '../../controllers/global';
import { getAllStatus, getAllCompanys } from '../../controllers/global/index';
const global: Router = Router();

// controllers

// ? Ident_type
//
global.route('/ident_type').get(getAllIdent_type);

// ? activity
//
global.route('/activity').get(getAllActivity);

// ? status
//
global.route('/status').get(getAllStatus);

// ? company
//
global.route('/company').get(getAllCompanys);

// ? type_solict
//
global.route('/types_solict').get(getAllTypeSolicts);

// ? tipo_de_carteras
//
global.route('/tipo_de_carteras').get(getAllTiposDeCarteras);

// ? telemark
//
global.route('/telemarket').get(getAllTeleMarket);

// ? distribuidores
//
global.route('/distribuidores').get(getAlldistribuidores);

// ? typePayment
//
global.route('/type_Pay').get(getAllTypePayment);

// ? requestSource
//
global.route('/request_source').get(getAllRequestSource);

// ?
//
// global.route('/')

// ? images
export default global;
