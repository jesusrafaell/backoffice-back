import crypto from 'crypto';
import code from 'services/office/Middlewares/err/code';
import { CompletionTriggerKind } from 'typescript';

const algorithm = 'sha256';
const Securitykey = 'keykeykeykeykeykeykeykey';

function numToSSColumnLetter(num: number) {
	let columnLetter = '',
		t;

	while (num > 0) {
		t = (num - 1) % 26;
		columnLetter = String.fromCharCode(65 + t) + columnLetter;
		num = ((num - t) / 26) | 0;
	}
	return columnLetter;
}

function convertLetterToNumber(str: string) {
	str = str.toUpperCase();
	let out = 0,
		len = str.length;
	for (let pos = 0; pos < len; pos++) {
		out += (str.charCodeAt(pos) - 64) * Math.pow(26, len - pos - 1);
	}
	return out;
}

export const createEncriptCode = (item1: number, item2: number, item3: number) => {
	let value1 = numToSSColumnLetter(item1);
	let value2 = numToSSColumnLetter(item2);
	let value3 = numToSSColumnLetter(item3);
	const codeX = value1.padStart(4, '0') + 'C' + value2.padStart(3, '0') + 'X' + value3.padStart(3, '0');
	return codeX;
};

export const desEncriptCode = (text: string) => {
	let item1 = convertLetterToNumber(text.slice(1, 5).replace('0', ''));
	console.log(text.slice(1, 5).replace('0', ''));
	let item2 = convertLetterToNumber(text.slice(6, 9));
	console.log(text.slice(6, 9));
	let item3 = convertLetterToNumber(text.slice(10, 13));
	console.log(text.slice(10, 13));
	console.log(item1, item2, item3);
	return '';
};
