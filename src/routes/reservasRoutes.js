//. ---- CREAR ENRUTADOR ----

import express from "express";

// Se llega aquí con http://localhost:3000/api/clientes

//crear el Router
const router = express.Router();


//Rutas disponibles para reservas

// GET 
router.get('/', getReservasHandler);

// POST
router.post('/', createReservaHandler);

// DELETE
router.delete('/:id', deleteReservaHandler);

export default router;