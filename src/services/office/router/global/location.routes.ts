import { Router } from 'express';
import {
	getDireccionesEstado,
	getDireccionesMunicipio,
	getDireccionesCiudad,
	getDireccionesParroquia,
	getDireccionesSector,
} from '../../controllers/global/location';

const Location: Router = Router();

// controllers

// ? Location
//
Location.route('/Location/:id').get();
//
//Location.route('/Location/estado').get(getEstados);
//
//Location.route('/Location/:id_estado/municipio').get(getMunicipiosByEstado);
//
//Location.route('/Location/:id_municipio/parroquia').get(getParroquiasByMunicipio);
//
//Location.route('/Location/:id_estado/ciudad').get(getCiudadByEstado);
//
Location.route('/direccion/estado').get(getDireccionesEstado);
//
Location.route('/direccion/:estado/municipio').get(getDireccionesMunicipio);
//
Location.route('/direccion/:estado/:municipio/ciudad').get(getDireccionesCiudad);
//
Location.route('/direccion/:estado/:municipio/:ciudad/parroquia').get(getDireccionesParroquia);
//
Location.route('/direccion/:estado/:municipio/:ciudad/:parroquia/sector').get(getDireccionesSector);

export default Location;
