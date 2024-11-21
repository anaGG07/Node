// crear un enrutador (Router de express)

import express from "express";

// se llega aqui con http://localhost:3000/api/clientes

// crear el Router
const router = express.Router();

// todas las opetaciones y rutas disponibles para los clientes

// GET 
router.get('/', getClientesHandler);

// POST
router.post('/', createClienteHandler);

// DELETE
router.delete('/:id', deleteClienteHandler);

export default router;

