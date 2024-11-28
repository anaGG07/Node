//' IMPORTACIONES 

import { createCliente, getAllClients } from "../models/client.js"



//. GET 

export const getClienteHandler = (req, res) => {

}

export const getAllClientesHandler = (req, res) => {
    // llamar a la funcion sqlite que se traiga todos los clientes
    getAllClients((err, rows)=>{
        err ? res.status(500).json({ error:err.message }) : res.status(200).json(rows);
    });
}


// . POST 
export const createClienteHandler = (req, res) => {
    // desestructuración del body dela petición
    const { nombre, email } = req.body;

    // createCliente es la consulta SQL para crear un cliente
    createCliente(nombre, email, (err, result)=>{
        // el codigo 500 -> servidor no conecta, el 200 -> conexión exitosa, el 201 -> todo bien y devuelve la data
        err ? res.status(500).json({ error:err.message }) : res.status(201).json(result);
    });
}

export const deleteClienteHandler = () => {
    
}
