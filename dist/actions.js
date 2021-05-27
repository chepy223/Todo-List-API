"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.updateTodos = exports.getUsersTodos = exports.createUserTodos = exports.getUsersOne = exports.deleteUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Todos_1 = require("./entities/Todos");
var utils_1 = require("./utils");
/* NOTA IMPORTANTE: "Users" es una tabla de ".entities/Users" */
/* POST Creamos 1 usuario*/
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.first_name)
                    throw new utils_1.Exception("first_name - Escriba un nombre porfavor");
                if (!req.body.last_name)
                    throw new utils_1.Exception(" last_name - Escriba un apellido porfavor");
                if (!req.body.email)
                    throw new utils_1.Exception("email - Escriba un email porfavor");
                if (!req.body.password)
                    throw new utils_1.Exception("password - Escriba una contraseña porfavor");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Ya existe un usuario con este correo: " + user.email);
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
/* Leemos TODOS los usuarios GET */
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                /* Damos una Respuesta */
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
/* Eliminamos 1 usuario DELETE ((tambien tenemos que eliminar las tareas */
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!!users) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El usuario no existe" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos)["delete"]({ users: users })];
            case 3:
                result = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)["delete"](users)];
            case 4:
                _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteUser = deleteUser;
/* ************************************************************************************** */
/* LEEMOS 1 SOLO GET segun el parametro*/
var getUsersOne = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsersOne = getUsersOne;
/* ************************************************************************************** */
/* POST TODOS */
var createUserTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userTodos, userTodo, todos, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                /* Si la descripcion esta vacia */
                if (!req.body.descripcion)
                    throw new utils_1.Exception("descripcion - Escriba una descripcion porfavor");
                userTodos = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userTodos.findOne(req.params.id)];
            case 1:
                userTodo = _a.sent();
                if (!userTodo) return [3 /*break*/, 3];
                todos = new Todos_1.Todos();
                /* le asignamos la descripcion a todos.descripcion */
                todos.descripcion = req.body.descripcion;
                todos.done = false;
                /* le asignamos el usuario que le pertenece */
                todos.users = userTodo;
                return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).save(todos)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json("mesagger srgio un error")];
        }
    });
}); };
exports.createUserTodos = createUserTodos;
/* ************************************************************************************** */
/* Leemos TODA la LISTA de 1 usuario */
var getUsersTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                users = _a.sent();
                if (!!users) return [3 /*break*/, 2];
                return [2 /*return*/, res.json({ "messager": "El usuario no existe" })];
            case 2: return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).find({ where: { users: users } })];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.getUsersTodos = getUsersTodos;
/* ************************************************************************************** */
/* Metodo PUT tenes que poner el id de quien queres ediar */
var updateTodos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).findOne(req.params.id)];
            case 1:
                todos = _a.sent();
                if (!todos) return [3 /*break*/, 3];
                /* entonces, remplazamos la lista esa que guardamos en la variable "todos" y la remplazamos (merge)
            por los datos que le pasamos (req.body)*/
                typeorm_1.getRepository(Todos_1.Todos).merge(todos, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Todos_1.Todos).save(todos)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
            case 3: return [2 /*return*/, res.json({ msg: "Usuario no encontrado" })];
        }
    });
}); };
exports.updateTodos = updateTodos;
