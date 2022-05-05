import { Router } from 'express';
import { upload, uploads } from '../Middlewares/upload/index';
import { upFilesRecaudos, editRcByFm } from '../controllers/1000pagos.controllers';
import convert from '../Middlewares/upload/convert';

const RC: Router = Router();

// RC
RC.route('/RC').post(uploads, upFilesRecaudos);
//
RC.route('/RC/admition/:id_request/diferidos').put(uploads, convert, editRcByFm);
//
export default RC;
