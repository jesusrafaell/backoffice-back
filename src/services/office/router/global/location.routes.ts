<<<<<<< HEAD
import { Router } from 'express';
import {
	getEstados,
	getMunicipiosByEstado,
	getParroquiasByMunicipio,
	getCiudadByEstado,
} from '../../controllers/global/location';

const Location: Router = Router();

// controllers

// ? Location
//
Location.route('/Location/:id').get();
//
Location.route('/Location/estado').get(getEstados);
//
Location.route('/Location/:id_estado/municipio').get(getMunicipiosByEstado);
//
Location.route('/Location/:id_municipio/parroquia').get(getParroquiasByMunicipio);
//
Location.route('/Location/:id_estado/ciudad').get(getCiudadByEstado);

export default Location;
=======
import { Router } from 'express';
import {
	getEstados,
	getMunicipiosByEstado,
	getParroquiasByMunicipio,
	getCiudadByEstado,
} from '../../controllers/global/location';

const Location: Router = Router();

// controllers

// ? Location
//
Location.route('/Location/:id').get();
//
Location.route('/Location/estado').get(getEstados);
//
Location.route('/Location/:id_estado/municipio').get(getMunicipiosByEstado);
//
Location.route('/Location/:id_municipio/parroquia').get(getParroquiasByMunicipio);
//
Location.route('/Location/:id_estado/ciudad').get(getCiudadByEstado);

export default Location;
>>>>>>> e49ac2ff50e4c1c9b101ffc672736c574636bcaa
