import { Router } from 'express';
import { getAllIdent_type, getAllActivity } from '../../controllers/global';
import { getAllStatus } from '../../controllers/global/index';
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

// ? images
export default global;
