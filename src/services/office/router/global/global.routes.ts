import { Router } from 'express';
import {
	getAllIdent_type,
	getAllActivity,
	getAllTypeSolicts,
	getAllTiposDeCarteras,
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

// ?
//
// global.route('/')

// ? images
export default global;
