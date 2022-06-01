export const createMerchantId = (value1: string, id: number) => {
	const merchantId = `7${Number(value1)}${11000 + (id + 170)}`;
	return merchantId;
};
