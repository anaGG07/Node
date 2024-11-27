# Guía para Configurar, Levantar y Finalizar una API REST con Node.js y Express


## ──── ✧ Pasos para levantar el proyecto ✧ ────


 - ### Crear una carpeta base y situarse en ella
 - ### Ejecutar `npm init -y` para generar el archivo `package.json`
 - ### Instalar dependencias necesarias. En este caso `express`, `dotenv`, `sqlite3`.
  
    ```JavaScript
    npm install express dotenv sqlite3
    ```
<br>

## ──── ✧ Actualizar el archivo package.json ✧ ────

- ### El campo `main` debe apuntar al archivo principal del proyecto (src/server.js)
  ```json
  "main": "src/server.js",
  ```

- ### En el apartado `"scripts"`, agregar el comando personalizado para la ejecución del proyecto.
  ```json
    "scripts": {
      "start": "node src/server.js", // En la terminal, utilizar npm start
    }
  ```

- ### Definir el módulo del proyecto para utilizar `import` y `export` en lugar de `require`. 
  ```json
    "type": "module",
  ```

### Ejemplo final 

```json
{
  "name": "api-reservas-dual",
  "version": "1.0.0",
  "description": "API REST para manejar reservas de hotel",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
  },
  "author": "Ana",
  "license": "ISC",
  "dependencies": {
    "dotenv": "16.4.5",
    "express": "4.21.1",
    "sqlite3": "5.1.7"
  },
  "devDependencies": {
    "nodemon": "2.0.22"
  }
}
```
<br>

> [!NOTE]
> ### Diferencias entre importaciones y exportaciones nombradas y por defecto
> - ### Por defecto:
>   #### Este tipo se usa cuando un módulo exporta un solo valor principal y solo puede haber un `export default` por archivo.
> 
>   #### Exportar: 
>   ```javascript
>   const sumar = (a, b) => a + b;
>   export default sumar; // Exportación por defecto
>   ```
> 
>   #### Importar: 
>   ```javascript
>   import sumar from './math.js';
>   console.log(sumar(2, 3)); // 5
>   ```
>   <br>
> 
> - ### Nombradas:
>   #### Este tipo permite exportar múltiples valores desde un archivo. Para importar los valores, es necesario utilizar llaves `{}`.
> 
>   #### Exportar: 
>   ```javascript
>   export const sumar = (a, b) => a + b;
>   export const restar = (a, b) => a - b;
>   ```
> 
>   #### Importar: 
>   ```javascript
>   import { sumar, restar } from './math.js';
>   console.log(sumar(2, 3)); // 5
>   console.log(restar(5, 2)); // 3
>   ```
>
>  <br>
> 
> - ### Combinación:
>   ```javascript
>   import multiplicar, { sumar, restar } from './math.js';
>   ```

<br>

## ──── ✧ Estructura del Proyecto ✧ ────

### Ejemplo de estructura básica: 

```
API-RESERVAS-DUAL/
|
├── database/
│   └── hotel.sqlite (Archivo SQLite, inicializado al conectarse)
|
├── src/
│   ├── config/
│   │   └── config.js (Variables de entorno y configuraciones generales)
|   |
│   ├── routes/
│   │   ├── clientesRoutes.js (Rutas para los clientes)
│   │   ├── reservasRoutes.js (Rutas para las reservas, si existieran)
|   |
│   ├── database.js (Conexión con la base de datos SQLite)
│   └── server.js (Archivo principal del servidor)
|
├── .env (Variables de entorno, como puerto y ruta de la base de datos)
├── package.json (Gestión de dependencias y scripts)
```

- ### `src/config/config.js`: Define configuraciones reutilizables (como puerto y ruta de la base de datos).
- ### `src/routes/`: Contiene las rutas para los diferentes endpoints de la API.
- ### `src/database.js`: Establece la conexión con la base de datos y crea tablas iniciales.
- ### `src/server.js`: Configura y arranca el servidor Express.

<br> 

## ──── ✧ Configuración del Archivo .env ✧ ────

### `.env` es un archivo de texto plano donde se definen las variables de entorno. Estas variables se utilizan para configurar la aplicación sin exponer datos sensibles.

### Ejemplo para este proyecto:
```javascript
PORT = 3000
DATABASE_PATH = ./database/hotel.sqlite
```
<br>

## ──── ✧ Conexión con la Base de Datos ✧ ────

### Establecer la configuración de la base de datos en `src/database.js`:

#### Para la configuración de la base de datos se utiliza, en este caso, SQLite. Es una base de datos ligera, sin servidor que guarda los datos en un archivo local. 
#### SQLite3 es un paquete que permite interactuar con bases de datos mediante un conjunto de métodos que permiten conectar, consultar y administrar bases de datos SQLite.

### Ejemplo del archivo ``database.js``:
```javascript
import sqlite3 from 'sqlite3';
import { DATABASE_PATH } from './config/config.js';

const db = new sqlite3.Database(DATABASE_PATH, (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa con la base de datos');
  }
});

export default db;
```

- ### ``Database()`` : 
  ### Es un constructor que crea o abre una base de datos SQLite.
  - Si el archivo de base de datos existe, se abre.
  - Si no existe, se crea automáticamente.
  
  ### Parámetros:
  - ### `filename` (String) -> Ruta al archivo de la base de datos
  - ### `callback` (función) -> Función que se ejecuta al completar la operación.

  ### Qué devuelve:
  - Un objeto sw ripo sqlite3.Database.

  ### Métodos comunes del Objeto Database:
  - ### `serialize()` :
    - ### Asegura que las consultas se ejecuten en orden (una a la vez):
        ```javascript
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)');
            db.run('INSERT INTO users (id, name) VALUES (1, "Alice")');
        }); // El segundo comando depende del primero. Serialize es útil para comandos que dependen entre sí.
        ```
    <br>

  - ### `run(sql, params, callback)` :
    - ### Ejecuta una consulta SQL que ***no devuelve datos*** (INSERT, UPDATE, DELETE o CREATE).
    - ### Params permite pasar valores dinámicos a la consulta usando placeholders (?).
    - ### Callback se ejecuta cuando la operación termina.
  
    ```javascript
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
        )`);
    });
    ```
    <br>


  - ### `get(sql, params, callback)` -> Función que se ejecuta al completar la operación.
    - ### Ejecuta una consulta SQL que devuelve ***una sola fila***.
    - ### Ideal para consultas con ``WHERE`` que esperan un único resultado.
  
    ```javascript
    db.get('SELECT * FROM users WHERE id = ?', [1], (err, row) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(row); // { id: 1, name: 'Alice' }
        }
    });
    ```
    <br>


  - ### `all(aql, params, callback)` :
    - ### Ejecuta una consulta SQL que devuelve ***todas*** las filas
    - ### Devuelve los resultados como un array
  
    ```javascript
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(rows); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
        }
    });
    ```
    <br>

  - ### `close(callback)` :
    - ### Cierra la conexión con la base de datos.
  
    ```javascript
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Conexión cerrada');
        }
    });
    ```
    <br>


## ──── ✧ Configuración del Servidor ✧ ────
### Se configura el servidor principal en ``src/server.js``

### Ejemplo del archivo:
```javascript
// IMPORTACIONES
import express from 'express'; 
import { PORT } from './config/config.js'; 
import clientesRoutes from './routes/clientesRoutes.js'; 

// CREAR INSTANCIA DE LA APLICACIÓN EXPRESS
const app = express();

// ESTABLECER UN MIDDLEWARE PARA PROCESAR SOLICITUDES CON JSON
app.use(express.json()); 

// CONFIGURAR LA RUTA PARA CLIENTES
app.use('/api/clientes', clientesRoutes);

// LEVANTAR EL SERVIDOR EN EL PUERTO ESPECIFICADO
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```
<br>

### ¿Qué es Express?

### Es un framework web para Node.js que simplifica la creación de servidores. Proporciona una estructura y métodos para manejar solicitudes HTTP, definir rutas y usar middlewares.

- ### ``express()`` :
  - ### Es una función que inicializa una nueva aplicación Express
  - ### Devuelce un objeto que representa la aplicación, al que se puede agregar rutas, middlewares y configurar el servidor.

<br>

- ### ``app.use(middleware)`` :
  - ### Método que registra un middleware o conjunto de ellos en la app Express.
  - ### ¿Qué es un middleware? Es una función que se ejecuta en cada solicitud HTTP antes de que llegue a la ruta específica.
    ```javascript
    app.use(express.json()); // Este middleware convierte el cuerpo de las solicitudes en formato JSON
    ```

<br>

- ### ``app.use(path, router)`` :
  - ### Asocia un conjunto de rutas definidas en un "enrutador" (como clientesRoutes) a una URL base.
  - ### El propósito es modularizar las rutas y organizarlas de manera lógica.
    ```javascript
    app.use('/api/clientes', clientesRoutes);
    ```
    > Todas las rutas definidas en clientesRoutes estarán disponibles bajo el prefijo /api/clientes.

<br>

- ### ``app.listen(port, callback)`` :
  - ### Inicia el servidor Express en el puerto especificado y pone la aplicación a escuchar solicitudes.
    ```javascript
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
    ```
<br>

## ──── ✧ Configuración de Rutas ✧ ────



## ──── ✧ Probar la API ✧ ────

- ### Levantar el servidor
  ```javascript
  npm start // Ejecuta el servidor configurado en "src/server.js"
  ```

- ### Realizar peticiones
  - Para probar con GET:
  ```javascript
  curl http://localhost:3000/api/clientes
  ```