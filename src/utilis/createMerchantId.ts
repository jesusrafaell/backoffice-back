export default function createMerchantId(value1: string, id: number) {
	//const merchantId = `7${Number(value1)}${10000 + id}`;
	const merchantId = `7${Number(value1)}${id}`; //usando el id del comercio de mil pagos
	return merchantId;
}
