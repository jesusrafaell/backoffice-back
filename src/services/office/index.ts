// Modules
import express, { Application, Request, Response } from 'express';
import { posRoutes, preRoutes } from './Middlewares';
import Routes from './router';
import mail from '../office/mail/mail';

//const { mailConnection } = require('../office/mail/mail');

const app: any = express();

// CorreoConexion
mail.mailConnection();

// middleware preRoutes
preRoutes(app);

app.use(express.json());

// Routes
Routes(app);

// meddleware posRutes
posRoutes(app);

// Settings

app.set('port', process.env.PORT_OFFICE || 5051);

export default app;
