//* TODO LO QUE INTRODUZCAMOS EN MODELS SERÁ LO ENCARGADO EN GESTIONAR LA RELACIÓN CON LA DB


//. ----- IMPORTAR ------ 

import db from "./database.js";

//. ---------- DEFINICIÓN DE FUNCIONES --------- 
/**
 * @description Función que crea un cliente nuevo
 * @param {String} nombre 
 * @param {String} email 
 * @param {Function} callback 
 */
export const createCliente = (nombre, email, callback) => {
    // Inserción en la BD de un cliente
    const sql = `INSERT INTO clientes (nombre, email) VALUES (?, ?)`;

    // Declarar parametros
    const params = [nombre, email];


    db.run(sql, params, function(err){
        callback(err, { id:this.lastID })
    });
};


export const getAllClients = (callback) => {

    const sql = `SELECT * FROM clientes`

    db.all(sql, [], function(err, rows){
        callback(err, rows)

    });

};



export const getClientById = (id, callback) => {

    const sql = `SELECT * FROM clientes WHERE id=?`

    db.get(sql, [id], (err, rows) => {
        callback(err, rows)
    });

};


export const deleteClientById = (id, callback) => {

    const sql = `DELETE FROM clientes WHERE id=?`

    db.run(sql, id, (err) => {
        callback(err, { changes:this.changes })
    });

    /* OTRA OPCIÓN
    db.run(sql, id, (err, rows) => {
        callback(err, rows)
    });
    */
};

export const updateClients = (id, nombre, email, callback) => {
    const sql = `UPDATE clientes SET nombre=?, email=? WHERE id=?`
    const params = [nombre, email, id];

    db.run(sql, params, (err) =>{
        callback(err, { changes:this.changes });
    });

};