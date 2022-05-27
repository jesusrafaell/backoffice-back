import { Router } from 'express';
import {
	getAllCommerce,
	createCommerce,
	createTerminal,
	getCommerceTerminals,
	getCommerceTms7,
	editCommerceTMS7,
} from '../controllers/TMS7';
import { CreateCommerceData, CreateTerminalData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
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
