import 'express-async-errors'//<---debe ser siempre el primero, ideal para el manejo de errores
import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';
import { url, renderIndex } from "./utils"
import privateRoutes from './private_routes'
import publicRoutes from './public_routes'

/* Numero del puerto */
const PORT:number = 3001;
const PUBLIC_URL = url(PORT)
const app = express();

// create a database connection based on the ./ormconfig.js file
const connectionPromess = createConnection();

/* 
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use(cors()) //disable CORS validations - Lo importamos para no tener provlemas de validacion con el Font
app.use(express.json()) // the API will be JSON based for serialization
app.use(morgan('dev')); //logging - usamos morgan para hacer logueo

// render home website with usefull information for boilerplate developers (students)
app.get('/', (req, res) => renderIndex(app, PUBLIC_URL).then(html => res.status(404).send(html)))


// esta línea tiene que estar POR ENCIMA del middleware JWT para evitar
// el middleware jwt para influir en estos puntos finales
//Voy a usar rutas publicas
app.use(publicRoutes);

/**
 * ⚠️ IMPORTANT
 * Este es el lugar para incluir su middleware JWT que hará que las rutas privadas sean realmente privadas
 * */

 
// Esta línea tiene que estar DEBAJO del middleware JWT para hacer cumplir
// Todas estas rutas serán privadas
//Voy a usar rutas privadas
app.use(privateRoutes);

// Ruta vacía predeterminada para 404
app.use( (req, res) => res.status(404).json({ "message": "Not found" }))

// start the express server, listen to requests on PORT - inicie el servidor expreso, escuche las solicitudes en PORT
app.listen(PORT , () => 
	console.info(
`==> 😎 Listening on port ${PORT}.
   Open ${PUBLIC_URL} in your browser.`
	)
);