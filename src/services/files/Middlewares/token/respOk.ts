import { Request, Response } from 'express';
import { Api } from 'interfaces';
import jwt from 'jsonwebtoken';
const Key: string = process.env.KEY || '_secreto';

const respOk = (req: Request<any, Api.Resp>, res: Response<Api.Resp>, msg: Api.Resp<any>) => {
	const { token }: any = req.headers;
	msg.info.token = jwt.sign(token, Key, { expiresIn: 60 * 30 });

	res.status(200).json(msg);
};

export default respOk;
