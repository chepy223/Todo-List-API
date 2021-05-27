"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("express-async-errors"); //<---debe ser siempre el primero, ideal para el manejo de errores
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var utils_1 = require("./utils");
var private_routes_1 = __importDefault(require("./private_routes"));
var public_routes_1 = __importDefault(require("./public_routes"));
/* Numero del puerto */
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
// create a database connection based on the ./ormconfig.js file
var connectionPromess = typeorm_1.createConnection();
/*
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use(cors_1["default"]()); //disable CORS validations - Lo importamos para no tener provlemas de validacion con el Font
app.use(express_1["default"].json()); // the API will be JSON based for serialization
app.use(morgan_1["default"]('dev')); //logging - usamos morgan para hacer logueo
// render home website with usefull information for boilerplate developers (students)
app.get('/', function (req, res) { return utils_1.renderIndex(app, PUBLIC_URL).then(function (html) { return res.status(404).send(html); }); });
// esta línea tiene que estar POR ENCIMA del middleware JWT para evitar
// el middleware jwt para influir en estos puntos finales
//Voy a usar rutas publicas
app.use(public_routes_1["default"]);
/**
 * ⚠️ IMPORTANT
 * Este es el lugar para incluir su middleware JWT que hará que las rutas privadas sean realmente privadas
 * */
// Esta línea tiene que estar DEBAJO del middleware JWT para hacer cumplir
// Todas estas rutas serán privadas
//Voy a usar rutas privadas
app.use(private_routes_1["default"]);
// Ruta vacía predeterminada para 404
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
// start the express server, listen to requests on PORT - inicie el servidor expreso, escuche las solicitudes en PORT
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n   Open " + PUBLIC_URL + " in your browser.");
});
