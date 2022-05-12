import { Router } from 'express';
import { abono1000pagos, createCommerce } from '../controllers/App1000Pagos';
import { CreateCommerceData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
//
Commerce.route('/app1000pagos/commerce').post(CreateCommerceData, createCommerce);
//

Commerce.route('/app1000pagos/abonoTms7').post(abono1000pagos);

//
export default Commerce;
