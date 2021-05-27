"use strict";
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
exports.__esModule = true;
var express_1 = require("express");
// declarar un nuevo enrutador para incluir todos los puntos finales
var router = express_1.Router();
/* Aqui van las rutas privadas */
/* Leemos los usuarios */
/* Aqui van las rutas publicas */
exports["default"] = router;
