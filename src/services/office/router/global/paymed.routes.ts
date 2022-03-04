<<<<<<< HEAD
import { Router } from 'express';

const Payments: Router = Router();

// controllers
import { paymentAll, typePayment } from '../../controllers/global/payment';

// ? pay_medthod
//
Payments.route('/payment/all').get(paymentAll);
//
Payments.route('/payment/types').get(typePayment);

export default Payments;
=======
import { Router } from 'express';

const Payments: Router = Router();

// controllers
import { paymentAll, typePayment } from '../../controllers/global/payment';

// ? pay_medthod
//
Payments.route('/payment/all').get(paymentAll);
//
Payments.route('/payment/types').get(typePayment);

export default Payments;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
