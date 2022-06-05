import { Router } from 'express';

import {
	getAllCommerce,
	createCommerce,
	createTerminal,
	getCommerceTerminals,
	getCommerceTms7,
	editCommerceTMS7,
	getAllCommerces,
	getAllTerminals,
} from '../controllers/TMS7/TMS7';
import { CreateCommerceData, CreateTerminalData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

//terminales
Commerce.route('/tms7/terminals').get(getAllTerminals);
//
// Commerce
Commerce.route('/tms7/commerces').get(getAllCommerces);
//
//
Commerce.route('/tms7/commerce')
	.get(getAllCommerce)
	.put(editCommerceTMS7)
	.post(CreateCommerceData, createCommerce);
//
Commerce.route('/tms7/commerce/:rif').get(getCommerceTms7);
//
Commerce.route('/tms7/commerce/terminals/:rif').get(getCommerceTerminals);
//
Commerce.route('/tms7/commerce/terminal').post(CreateTerminalData, createTerminal);

export default Commerce;
