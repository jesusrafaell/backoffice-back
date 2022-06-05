import { Router } from 'express';
import { getAllCommercesTMS7, getAllTerminalsTMS7 } from '../../controllers/activacion';

const Activacion: Router = Router();

Activacion.route('/tms7/terminals').get(getAllTerminalsTMS7);
//
Activacion.route('/tms7/commerces').get(getAllCommercesTMS7);
//

export default Activacion;
