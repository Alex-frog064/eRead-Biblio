# BdE Read API

API REST sencilla con documentación Swagger para operaciones CRUD con MySQL en Clever Cloud.

## 🚀 Características

- ✅ Operaciones CRUD completas (Create, Read, Update, Delete)
- 📚 Documentación Swagger/OpenAPI integrada
- 🗄️ Conexión a MySQL en Clever Cloud
- 🏗️ Estructura limpia y organizada
- 🔒 Validación de datos
- 🛡️ Manejo de errores

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Base de datos MySQL en Clever Cloud
- Cuenta en Clever Cloud con credenciales de acceso

## 🛠️ Instalación

1. Clonar o descargar el proyecto

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copia el archivo `.env.example` y renómbralo a `.env`
   - Completa las credenciales de tu base de datos MySQL de Clever Cloud:
```env
PORT=3000
MYSQL_ADDON_HOST=tu_host_aqui
MYSQL_ADDON_PORT=3306
MYSQL_ADDON_USER=tu_usuario_aqui
MYSQL_ADDON_PASSWORD=tu_contraseña_aqui
MYSQL_ADDON_DB=tu_base_de_datos_aqui
MYSQL_SSL=false
```

4. Crear la tabla en la base de datos:
   - Ejecuta el script SQL en `sql/schema.sql` en tu base de datos MySQL de Clever Cloud
   - Puedes hacerlo desde el panel de Clever Cloud o usando un cliente MySQL

## 🚀 Ejecución

### Modo desarrollo (con nodemon):
```bash
npm run dev
```

### Modo producción:
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## 📚 Documentación API

Una vez que el servidor esté corriendo, puedes acceder a la documentación Swagger en:

**http://localhost:3000/api-docs**

La documentación interactiva te permitirá:
- Ver todos los endpoints disponibles
- Probar las operaciones directamente desde el navegador
- Ver los esquemas de datos y respuestas

## 🔌 Endpoints Disponibles

### Autores

- **GET** `/api/autores` - Obtener todos los autores
- **GET** `/api/autores/:id` - Obtener un autor por ID
- **POST** `/api/autores` - Crear un nuevo autor
- **PUT** `/api/autores/:id` - Actualizar un autor existente
- **DELETE** `/api/autores/:id` - Eliminar un autor

### Categorías

- **GET** `/api/categorias` - Obtener todas las categorías
- **GET** `/api/categorias/:id` - Obtener una categoría por ID
- **POST** `/api/categorias` - Crear una nueva categoría
- **PUT** `/api/categorias/:id` - Actualizar una categoría existente
- **DELETE** `/api/categorias/:id` - Eliminar una categoría

### Libros

- **GET** `/api/libros` - Obtener todos los libros
- **GET** `/api/libros/:id` - Obtener un libro por ID
- **POST** `/api/libros` - Crear un nuevo libro
- **PUT** `/api/libros/:id` - Actualizar un libro existente
- **DELETE** `/api/libros/:id` - Eliminar un libro

### Roles

- **GET** `/api/roles` - Obtener todos los roles
- **GET** `/api/roles/:id` - Obtener un rol por ID
- **POST** `/api/roles` - Crear un nuevo rol
- **PUT** `/api/roles/:id` - Actualizar un rol existente
- **DELETE** `/api/roles/:id` - Eliminar un rol

### Usuarios

- **GET** `/api/usuarios` - Obtener todos los usuarios
- **GET** `/api/usuarios/:id` - Obtener un usuario por ID
- **POST** `/api/usuarios` - Crear un nuevo usuario
- **PUT** `/api/usuarios/:id` - Actualizar un usuario existente
- **DELETE** `/api/usuarios/:id` - Eliminar un usuario

### Registros de Libros

- **GET** `/api/registros` - Obtener todos los registros
- **GET** `/api/registros/:id` - Obtener un registro por ID
- **GET** `/api/registros/libro/:id_libro` - Obtener registros por libro
- **GET** `/api/registros/usuario/:id_usuario` - Obtener registros por usuario
- **POST** `/api/registros` - Crear un nuevo registro
- **PUT** `/api/registros/:id` - Actualizar un registro existente
- **DELETE** `/api/registros/:id` - Eliminar un registro

### Health Check

- **GET** `/health` - Verificar estado del servidor

## 📝 Ejemplos de Uso

### Crear un autor:
```bash
curl -X POST http://localhost:3000/api/autores \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Gabriel",
    "apellido": "García Márquez"
  }'
```

### Crear un libro:
```bash
curl -X POST http://localhost:3000/api/libros \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Cien años de soledad",
    "isbn": "978-84-376-0494-7",
    "id_autor": 1,
    "id_categoria": 1,
    "año": 1967,
    "editorial": "Sudamericana",
    "disponible": 1
  }'
```

### Crear un registro de préstamo:
```bash
curl -X POST http://localhost:3000/api/registros \
  -H "Content-Type: application/json" \
  -d '{
    "id_libro": 1,
    "id_usuario": 1,
    "accion": "prestado",
    "fecha_accion": "2024-01-15"
  }'
```

### Obtener todos los libros:
```bash
curl http://localhost:3000/api/libros
```

### Obtener registros por libro:
```bash
curl http://localhost:3000/api/registros/libro/1
```

## 📁 Estructura del Proyecto

```
BdEread/
├── config/
│   └── database.js              # Configuración de conexión MySQL
├── controllers/
│   ├── autorController.js       # Controlador de autores
│   ├── categoriaController.js   # Controlador de categorías
│   ├── libroController.js       # Controlador de libros
│   ├── rolController.js          # Controlador de roles
│   ├── usuarioController.js     # Controlador de usuarios
│   └── registroLibroController.js # Controlador de registros
├── models/
│   ├── Autor.js                  # Modelo de autor
│   ├── Categoria.js              # Modelo de categoría
│   ├── Libro.js                  # Modelo de libro
│   ├── Rol.js                    # Modelo de rol
│   ├── Usuario.js                # Modelo de usuario
│   └── RegistroLibro.js          # Modelo de registro
├── routes/
│   ├── autores.js                # Rutas de autores
│   ├── categorias.js             # Rutas de categorías
│   ├── libros.js                 # Rutas de libros
│   ├── roles.js                  # Rutas de roles
│   ├── usuarios.js               # Rutas de usuarios
│   └── registros.js              # Rutas de registros
├── .sql/
│   └── schema.sql                # Script SQL para crear todas las tablas
├── env.example                   # Ejemplo de variables de entorno
├── .gitignore                    # Archivos ignorados por git
├── package.json                  # Dependencias del proyecto
├── server.js                     # Punto de entrada de la aplicación
└── README.md                     # Este archivo
```

## 🔧 Configuración de Clever Cloud

En Clever Cloud, las variables de entorno generalmente se configuran automáticamente cuando agregas un addon de MySQL. Las variables suelen tener el formato:

- `MYSQL_ADDON_HOST`
- `MYSQL_ADDON_PORT`
- `MYSQL_ADDON_USER`
- `MYSQL_ADDON_PASSWORD`
- `MYSQL_ADDON_DB`

Si tus variables tienen otro formato, puedes ajustarlas en `config/database.js`.

## 🐛 Solución de Problemas

### Error de conexión a MySQL:
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que tu IP esté permitida en Clever Cloud (si aplica)
- Verifica que el addon de MySQL esté activo en Clever Cloud

### Error "Table doesn't exist":
- Ejecuta el script SQL en `sql/schema.sql` en tu base de datos

### Puerto en uso:
- Cambia el puerto en el archivo `.env` o en `server.js`

## 📄 Licencia

ISC

## 👤 Autor

Creado como estructura base para API REST con Swagger y MySQL.

