import { Router } from 'express';
import { getAllCommerce, createCommerce, getAllTerminal, createTerminal } from '../controllers/TMS7';
import { CreateCommerceData, CreateTerminalData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
//
Commerce.route('/tms7/commerce').get(getAllCommerce).post(CreateCommerceData, createCommerce);
//
Commerce.route('/tms7/commerce/terminal').get(getAllTerminal).post(CreateTerminalData, createTerminal);

export default Commerce;
