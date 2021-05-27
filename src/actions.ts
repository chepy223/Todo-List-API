import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Todos } from './entities/Todos'
import { Exception } from './utils'

/* NOTA IMPORTANTE: "Users" es una tabla de ".entities/Users" */

/* POST Creamos 1 usuario*/
export const createUser = async (req: Request, res:Response): Promise<Response> =>{
	if(!req.body.first_name) throw new Exception("first_name - Escriba un nombre porfavor")
	if(!req.body.last_name) throw new Exception(" last_name - Escriba un apellido porfavor")
	if(!req.body.email) throw new Exception("email - Escriba un email porfavor")
	if(!req.body.password) throw new Exception("password - Escriba una contraseña porfavor")

    /* Nos guadamos a todos los usuarios en "userRepo" */
    const userRepo = getRepository(Users)
    
    /* VALIDAMOS QUE NADIE +MAS+ tenga ese mismo correo, tiene que ser Unico(unique) */
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception(`Ya existe un usuario con este correo: ${user.email}`)
    /* Si cumple con todo correctamente, CREAMOS EL USUARIO */
	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}
/* Leemos TODOS los usuarios GET */
export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
    /* Leemos TODOS (find) los usuarios de la BD (getRespository(tablaUsers)) */
    const users = await getRepository(Users).find();
    /* Damos una Respuesta */
    return res.json(users);
}
/* Eliminamos 1 usuario DELETE ((tambien tenemos que eliminar las tareas */
export const deleteUser = async (req: Request, res: Response): Promise<Response> =>{
        /* guardamos en users | buscamos en la BD en la tabla Users un solo valor con el id req.params.id */
         const users = await getRepository(Users).findOne(req.params.id);
        /*(validamos si el usuario existe) */
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            /* Caso contrario, el usuario SI existe, entonces le pasamos el usuarios que queremos borrar  en el todo list (recuerda que esta como FK)
	    	Nota: creo que no estamos borrando la lista(Verificar)
	    */
            const result = await getRepository(Todos).delete({users: users});
            await getRepository(Users).delete(users);
            return res.json(result);
        }
}

/* ************************************************************************************** */
/* LEEMOS 1 SOLO GET segun el parametro*/
export const getUsersOne = async (req: Request, res: Response): Promise<Response> =>{
        const users = await getRepository(Users).findOne(req.params.id);
        return res.json(users);
}

/* ************************************************************************************** */
/* POST TODOS */
export const createUserTodos = async (req: Request, res:Response): Promise<Response> =>{
    
    /* Si la descripcion esta vacia */
    if(!req.body.descripcion) throw new Exception("descripcion - Escriba una descripcion porfavor")
    
    /* Nos guadamos todos los usuarios en "userTodos" */
    const userTodos = getRepository(Users)
    
    /* buscamos a 1 usuario con el id  */
	const userTodo = await userTodos.findOne(req.params.id)
	if(userTodo) {
        /* guardamos la tabla en todos */
        let todos = new Todos();
        /* le asignamos la descripcion a todos.descripcion */
        todos.descripcion = req.body.descripcion;
        todos.done = false;
        /* le asignamos el usuario que le pertenece */
        todos.users = userTodo;
        /* vamos a la bd y grabamos todos los datos nuevos */
        const results = await getRepository(Todos).save(todos);
        return res.json(results);
    }else{
        return res.json("mesagger srgio un error");
    }
}

/* ************************************************************************************** */
/* Leemos TODA la LISTA de 1 usuario */
export const getUsersTodos = async (req: Request, res: Response): Promise<Response> =>{
 
         const users = await getRepository(Users).findOne(req.params.id);
        if(!users){
            return res.json({"messager":"El usuario no existe"})
        }else{
            /*                como identificar al usuario - where {users: users} */
            const result = await getRepository(Todos).find({where: {users: users}});
            return res.json(result);
        }
}

/* ************************************************************************************** */
/* Metodo PUT tenes que poner el id de quien queres ediar */
export const updateTodos = async (req: Request, res: Response): Promise<Response> =>{
	/* Si encontramos 1 lista con el id que le pasamos */
        const todos = await getRepository(Todos).findOne(req.params.id);
        if(todos){
            /* entonces, remplazamos la lista esa que guardamos en la variable "todos" y la remplazamos (merge) 
	    por los datos que le pasamos (req.body)*/
            getRepository(Todos).merge(todos, req.body); 
	    /* Guardamos los datos que le aplicamos a la variable "todos" */
            const results = await getRepository(Todos).save(todos)
            return res.json(results);
        }
        return res.json({msg: "Usuario no encontrado"})
}
