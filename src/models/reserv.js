
//. ---- IMPORTAR BASE DE DATOS ---- 

import db from "./database.js"

//. ---- DEFINICIÓN DE FUNCIONES ---- 

// CreateReserva
export const createReserva = (cliente_id, fecha_entrada, fecha_salida, callback) => {
    // Insertar la reserva en bd
    const sql = `INSERT INTO reservas (cliente_id, fecha_entrada, fecha_salida) VALUES (?, ?, ?)`;

    //Delcarar parámetros
    const params = [cliente_id, fecha_entrada, fecha_salida];

    db.run(sql, params, function(err){
        callback(err, { id:this.lastID })
    });
};

// getAllReservas
export const getAllReservas = (callback) => {
    const sql = `SELECT * FROM reservas`

    db.all(sql, [], function(err, rows){
        callback(err, rows)
    });
};

// getReservaById
export const getReservaById = (id, callback) => {
    const sql = `SELECT * FROM reservas WHERE id=?`

    db.get(sql, [id], (err, rows) => {
        callback(err, rows)
    });
}

// deleteReserva
export const deleteReserva = (id) => {
    const sql = `DELETE FROM reservas WHERE id=?`

    db.run(sql, id, (err) => {
        callback(err, { changes:this.changes })
    });
}

// updateReserva
export const updateReserva = (id, fecha_entrada, fecha_salida, callback) => {
    const sql = `UPDATE reservas SET fecha_entrada=?, fecha_salida=? WHERE id=?`
    const params = [fecha_entrada, fecha_salida, id];

    db.run(sql, params, (err) =>{
        callback(err, { changes:this.changes });
    });

};