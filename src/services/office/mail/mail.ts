require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transporter = nodemailer.createTransport({
	host: process.env.MAIL_HOST,
	service: 'Outlook365',
	port: process.env.PORT, //25
	secure: true, // use TLS
	secureConnection: false,
	auth: {
		// type: 'LOGIN',
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
	tls: {
		rejectUnauthorized: false,
		ciphers: 'SSLv3',
	},
	// logger: true,
	debug: true,
});

transporter.use(
	'compile',
	hbs({
		viewEngine: 'express-handlebars',
		viewPath: './views/',
	})
);

const mailConnection = async () => {
	try {
		// console.log('LLego');
		await transporter.verify().then(() => {
			console.log('Listo para enviar');
		});
	} catch (error) {
		console.log(error);
		throw new Error('Error a la hora de inicializar Mail');
	}
};

export default module.exports = {
	transporter,
	mailConnection,
};
