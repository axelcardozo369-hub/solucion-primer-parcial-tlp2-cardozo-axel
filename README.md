# Primer Parcial – Sistema de Gestión de Proyectos de Software (Base)

API REST con Node.js, Express y Sequelize/MySQL.

## Instalación

1. `npm install`
2. Copiar `.env.example` a `.env` y completar los valores.
3. Crear la base de datos en MySQL (`DB_NAME`).
4. `npm run dev`

## Endpoints

_Completar el listado de endpoints._

### Auth

| Método | Ruta                 | Acceso   | Descripción                                   |
| ------ | -------------------- | -------- | --------------------------------------------- |
| POST   | `/api/auth/register` | Público  | Registra un usuario con su perfil             |
| POST   | `/api/auth/login`    | Público  | Inicia sesión y guarda el token en una cookie |
| POST   | `/api/auth/logout`   | Logueado | Cierra sesión y elimina la cookie             |

### Users

| Método | Ruta             | Acceso        | Descripción                      |
| ------ | ---------------- | ------------- | -------------------------------- |
| GET    | `/api/users`     | Administrator | Lista todos los usuarios         |
| DELETE | `/api/users/:id` | Administrator | Elimina (lógicamente) un usuario |

### Projects

| Método | Ruta                        | Acceso             | Descripción                                            |
| ------ | --------------------------- | ------------------ | ------------------------------------------------------ |
| POST   | `/api/projects`             | Logueado           | Crea un proyecto con sus technologies                  |
| GET    | `/api/projects`             | Administrator      | Lista todos los proyectos con su leader y technologies |
| GET    | `/api/projects/my-projects` | Logueado           | Lista los proyectos del usuario logueado               |
| PUT    | `/api/projects/:id`         | Líder del proyecto | Edita un proyecto y reemplaza sus technologies         |
| DELETE | `/api/projects/:id`         | Líder del proyecto | Elimina un proyecto                                    |

### Technologies

| Método | Ruta                    | Acceso        | Descripción                                    |
| ------ | ----------------------- | ------------- | ---------------------------------------------- |
| POST   | `/api/technologies`     | Administrator | Crea una technology                            |
| GET    | `/api/technologies`     | Logueado      | Lista todas las technologies con sus proyectos |
| DELETE | `/api/technologies/:id` | Administrator | Elimina una technology                         |
