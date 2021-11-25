import { Router } from 'express';
import { getAllCommerce, createCommerce } from '../controllers/TMS7';
import { CreateCommerceData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Auth
//
Commerce.route('/commerce').get(getAllCommerce);
//
Commerce.route('/commerce').post(CreateCommerceData, createCommerce);

//
export default Commerce;
