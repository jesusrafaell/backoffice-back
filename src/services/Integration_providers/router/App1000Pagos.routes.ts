import { Router } from 'express';
import {
	abono1000pagos,
	createCommerce,
	createTerminalInPagina,
	editCommerce,
} from '../controllers/1000pagos/App1000Pagos';
import { CreateCommerceData } from '../Middlewares/data/commerce';

const Commerce: Router = Router();

// Commerce
//
Commerce.route('/app1000pagos/commerce').post(CreateCommerceData, createCommerce).put(editCommerce);
//
Commerce.route('/app1000pagos/abonoTms7').post(abono1000pagos);
//
Commerce.route('/app1000pagos/pagina_terminales').post(createTerminalInPagina);

//
export default Commerce;
