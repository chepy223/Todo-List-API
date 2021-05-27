/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

// declarar un nuevo enrutador para incluir todos los puntos finales
const router = Router();
/* Aqui van las rutas privadas */
/* Leemos los usuarios */
/* Aqui van las rutas publicas */

 
export default router;
