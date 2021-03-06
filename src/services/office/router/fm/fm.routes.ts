import { Router } from 'express';
import {
	valid_existin_client,
	FM_create,
	getFm,
	editStatusByIdAdmision,
	valid_existin_clientAndCommerce,
	FM_extraPos,
	editStatusAdmitionDiferido,
	valid_existin_client_diferido,
	valid_existin_commerce_diferido,
	getAllFM,
} from '../../controllers/FM_request/index';

import { getFmAdministration, editStatusByIdAdministration } from '../../controllers/adminitration/index';

import { validExistingClient, validBankAccount } from '../../Middlewares/data/auth';
import {
	fmForDataDiferido,
	fmForDataExtraPos,
	fmFormData,
	pagoFormData,
	validExistingClientDiferido,
	validExistingCommerceDiferido,
} from '../../Middlewares/data/fm';
import { valid_bank_account } from '../../controllers/FM_request';
import { requestOrigin, valid_exitin_commerce } from '../../controllers/FM_request/index';

const FM: Router = Router();
//
FM.route('/FM/:id_FM').get(getFm);
//
//-Creacion FM
//
FM.route('/FM/client/valid').post(validExistingClient, valid_existin_client);
//
FM.route('/FM/:id/commerce/valid').post(valid_exitin_commerce);
//
FM.route('/FM').get(getAllFM).post(fmFormData, FM_create);
//
FM.route('/FM/extraPos').post(fmForDataExtraPos, FM_extraPos);
//
FM.route('/FM/valid/extrapos').post(valid_existin_clientAndCommerce);
//
FM.route('/FM/bank/valid').post(validBankAccount, valid_bank_account);
//
//Update FM
//
FM.route('/FM/admision/:id_FM/status').put(editStatusByIdAdmision);
//
//
FM.route('/FM/origins').get(requestOrigin);
//
//diferido
FM.route('/FM/client/diferido/valid').post(validExistingClientDiferido, valid_existin_client_diferido);
//
FM.route('/FM/commerce/diferido/valid').post(validExistingCommerceDiferido, valid_existin_commerce_diferido);
//
FM.route('/FM/admition/:id_FM/diferido').put(fmForDataDiferido, editStatusAdmitionDiferido);
//
//administraocin
//
FM.route('/FM/administration').get(getFmAdministration);
//
FM.route('/FM/administration/:id_FM/status').put(pagoFormData, editStatusByIdAdministration);

export default FM;
