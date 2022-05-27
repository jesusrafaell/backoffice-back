import { Router } from 'express';
import { commerceFormData } from '../../Middlewares/data/edit';
import { getAllCommercesValidated, getDataCommerce, updateCommerce } from '../../controllers/editData/commerce';
//import { valid_existin_client } from '../../controllers/FM_request/index';
//import { validExistingClient } from '../../Middlewares/data/auth';

const UpdateCommerce: Router = Router();

UpdateCommerce.route('/listCommerces').get(getAllCommercesValidated);
//
UpdateCommerce.route('/commerce/:id_commerce').get(getDataCommerce);
//
UpdateCommerce.route('/commerce').post(commerceFormData, updateCommerce);

//UpdateCommerce.route('/commerce').post(validExistingClient, valid_existin_client);
//
//

export default UpdateCommerce;
