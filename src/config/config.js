// configuraciones necesarias del proyecto

import dotenv from 'dotenv';

// Cargar todas las variables de entorno del archivo .env en process.env
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_PATH = process.env.DATABASE_PATH || "./database/hotel.sqlite";

