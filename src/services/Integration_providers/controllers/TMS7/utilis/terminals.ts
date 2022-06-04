import axios from 'axios';

export const createTerminalTms7 = async (terminal: any, access_token: string): Promise<boolean | any> => {
	try {
		const res: any = await axios.post(`${process.env.HOST_TMS7}/TMS7API/v1/Terminal`, terminal, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		//console.log('terminal', res);
		console.log('creacion de termianl:', res.data);
		return {
			ok: true,
			terminal: res.data,
		};
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			extra: err?.response.Message,
			data: err?.response.data,
			ok: false,
		};
		console.log('Tms7 error ', resError);
		return resError;
		//console.log('Tms7 error ', err);
		return resError;
	}
};

export const validarRif_tms7 = async (rif: string, net_id: number, access_token: string): Promise<boolean> => {
	try {
		await axios.get(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=${net_id}&taxId=${rif}`, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return true;
	} catch (err) {
		let error: any = err;

		console.log(error);

		return false;
	}
};
