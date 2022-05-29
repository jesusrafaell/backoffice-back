import { Router } from 'express';
import {
	getAllIdent_type,
	getAllActivity,
	getAllTypeSolicts,
	getAllBanks,
	getAllTeleMarket,
	getAllTypePayment,
	getAllRequestSource,
	getAlldistribuidores,
	getAllTypesDiferidos,
	getAllAcis_Distribudores,
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
global.route('/tipo_de_carteras').get(getAllBanks);

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

// ? type_diferido
//
global.route('/type_diferido').get(getAllTypesDiferidos);

// ? acis and distribuidores
//
global.route('/aci&distribuidores').get(getAllAcis_Distribudores);

// ?
//
// global.route('/')

// ? images
export default global;
