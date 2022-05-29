import { Request, Response } from 'express';
import { Api } from 'interfaces';
import generateToken from '../../../../utilis/generateToken';
const Key: string = process.env.KEY || '_secreto';

const Resp = (req: Request<any, Api.Resp>, res: Response<Api.Resp>, msg: Api.Resp<any>) => {
	// msg.token = msg.token ? jwt.sign(token, Key, { expiresIn: 60 * 30 }) : msg.token;

	msg.token = (() => {
		if (!msg.token) {
			const { id, idDep, idRol }: any = req.headers.token;

			//console.log('generar token para ', id);

			return generateToken(id, idDep, idRol);
		} else {
			return msg.token;
		}
	})();

	res.status(200).json(msg);
};

export default Resp;
