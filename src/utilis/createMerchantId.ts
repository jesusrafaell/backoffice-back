export const createMerchantId = (value1: number, id: number) => {
	const merchantId = `7${value1}${11000 + (id + 800)}`;
	return merchantId;
};