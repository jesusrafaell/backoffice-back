export const createMerchantId = (value1: number, id: number) => {
	const merchantId = `7${value1}${11000 + (id + 1999)}`;
	return merchantId;
};
