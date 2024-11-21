import express from "express";
import { PORT } from "./config/config.js";

// crear aplicacion de tipo express
const app = express();

// decir que ficheros vamos a utilziar (JSON)
app.use(express.json());

// establecer rutas 
app.use("/api/clientes",  clientesRoutes); // <-- lo que el usuario tiene que poner en el navegador "localhost:3000/api/clientes"
app.use("/api/reservas",  reservasRoutes);


// arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// 
