import axios from 'axios';

export const getMerchanId = async (
	taxId: string,
	net_id: number,
	access_token: string
): Promise<boolean | any> => {
	try {
		const res: any = await axios.get(
			`${process.env.HOST_TMS7}/TMS7API/v1/Merchant?net_id=${net_id}&taxId=${taxId}`,
			{
				headers: {
					Authorization: 'Bearer ' + access_token,
				},
			}
		);
		const merchantId = res.data.merchants[0].merchantId;
		return {
			merchantId,
			data: res.data.merchants[0],
			ok: true,
		};
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			ok: false,
		};
		console.log('Tms7 error ', resError);
		return resError;
	}
};

export const createCommerceTMS7 = async (commerce: any, access_token: string): Promise<boolean | any> => {
	console.log(commerce);
	try {
		await axios.post(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant`, commerce, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return null;
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			data: err?.response.data,
		};
		//console.log(err);
		console.log('Tms7 error ', resError);
		return resError;
	}
};

export const updateCommerceTMS7 = async (commerce: any, access_token: string): Promise<boolean | any> => {
	console.log(commerce);
	try {
		await axios.put(`${process.env.HOST_TMS7}/TMS7API/v1/Merchant`, commerce, {
			headers: {
				Authorization: 'Bearer ' + access_token,
			},
		});
		return {
			ok: true,
		};
	} catch (err: any) {
		const resError = {
			message: err?.response.statusText,
			status: err?.response.status,
			data: err?.response.data,
			ok: false,
		};
		console.log('Tms7 error ', resError);
		return resError;
	}
};
