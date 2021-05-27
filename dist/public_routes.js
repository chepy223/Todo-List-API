"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var actions = __importStar(require("./actions"));
/* {
    "descripcion": "darle d ecomer al pez2"
} */
var router = express_1.Router();
/* POST 1 user Publicamos un usuario*/
router.post('/user', utils_1.safe(actions_1.createUser));
// GET TODOS LOS USUARIOS
router.get('/user', utils_1.safe(actions.getUsers));
/* Leemos 1 solo usuario */
router.get('/user/:id', utils_1.safe(actions.getUsersOne));
/* GET todas las tareas de 1 usuario */
router.get('/todos/:id', utils_1.safe(actions.getUsersTodos));
/* DELETE 1 USUARIO*/
router["delete"]('/user/:id', utils_1.safe(actions.deleteUser));
/* POST 1 lista segun el id del usuario*/
router.post('/todos/:id', utils_1.safe(actions.createUserTodos));
/* PUT 1 tarea*/
router.put('/todos/:id', utils_1.safe(actions.updateTodos));
exports["default"] = router;
