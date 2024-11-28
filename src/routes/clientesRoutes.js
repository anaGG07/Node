// crear un enrutador (Router de express)

import express from 'express';
import { createClienteHandler, deleteClienteHandler, getAllClientesHandler, getClienteHandler } from '../controllers/clientesController.js';

// se llega aqui con http://localhost:3000/api/clientes

// crear el Router
const router = express.Router();

// todas las opetaciones y rutas disponibles para los clientes

// GET 
router.get('/:id', getClienteHandler); // <-- trae uno solo

// POST
router.post('/', createClienteHandler);

// DELETE
router.delete('/:id', deleteClienteHandler);

// getAll
router.get("/", getAllClientesHandler); // <-- trae todos


export default router;

