 
import { Router } from 'express';
import { safe } from './utils';
import { createUser } from './actions';
import * as actions from './actions';

/* {
    "descripcion": "darle d ecomer al pez2"
} */
const router = Router();

 /* POST 1 user Publicamos un usuario*/
router.post('/user', safe(createUser));

// GET TODOS LOS USUARIOS
router.get('/user', safe(actions.getUsers));

/* Leemos 1 solo usuario */
router.get('/user/:id', safe(actions.getUsersOne));

/* GET todas las tareas de 1 usuario */
router.get('/todos/:id', safe(actions.getUsersTodos));

/* DELETE 1 USUARIO*/
 router.delete('/user/:id', safe(actions.deleteUser)); 

/* POST 1 lista segun el id del usuario*/
router.post('/todos/:id', safe(actions.createUserTodos));

/* PUT 1 tarea*/
router.put('/todos/:id', safe(actions.updateTodos));

export default router;
