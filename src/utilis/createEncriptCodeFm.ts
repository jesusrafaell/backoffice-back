import crypto from 'crypto';

const algorithm = 'aes-256-cbc';

export const createEncriptCode = (item1: number, item2: number, item3: number) => {
	const initVector = crypto.randomBytes(4);
	const Securitykey = '_secret';
	const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
	console.log('initVector:', initVector);
	let text = `${item1}/${item2}/${item3}`;
	let encryptedData = cipher.update(text, 'utf-8', 'hex');
	encryptedData += cipher.final('hex');
	return encryptedData;
};

export const desEncriptCode = (text: string) => {
	console.log('desc', text);
	const initVector = crypto.randomBytes(4);
	const Securitykey = '_secret';
	const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
	let decryptedData = decipher.update(text, 'hex', 'utf-8');
	decryptedData += decipher.final('utf8');
	return decryptedData;
};
