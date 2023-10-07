# Agenda de eventos
Aplicativo web de agenda de eventos. El aplicativo permite a los usuarios crear una cuenta con un nombre (usernamer),email y clave; con el que el usuario podrar crear, editar y eliminar eventos.

## Tecnologías Utilizadas

El proyecto está desarrollado utilizando las siguientes tecnologías:

### Frontend

El frontend de la aplicación se ha construido utilizando React, una popular biblioteca de JavaScript para la creación de interfaces de usuario interactivas y dinámicas. Algunas de las tecnologías y bibliotecas adicionales utilizadas en el frontend incluyen:

- [React Router](https://reactrouter.com/): Para el enrutamiento de la aplicación de una sola página (SPA).

El frontend de la aplicación se ejecuta en el puerto **5173**


### Backend

El backend de la aplicación se ha desarrollado utilizando Flask, un micro marco de Python para la creación de aplicaciones web. Flask es conocido por su simplicidad y versatilidad. Además de Flask, se han utilizado las siguientes tecnologías y bibliotecas en el backend:

- [Flask-CORS](https://flask-cors.readthedocs.io/): Para habilitar el intercambio de recursos entre dominios cruzados (CORS).
- [Flask-JWT-Extended](https://flask-jwt-extended.readthedocs.io/): Para la autenticación basada en tokens JSON Web (JWT).
- [PostgreSQL](https://www.postgresql.org/): Como sistema de gestión de bases de datos (DBMS).

El backend de la aplicación se ejecuta en el puerto **5000**

### Comunicación entre el Frontend y el Backend

El frontend y el backend se comunican entre sí a través de solicitudes HTTP. El frontend realiza solicitudes al backend para acceder a recursos y datos, y el backend responde con datos procesados.

Asegúrate de verificar las instrucciones anteriores para configurar y ejecutar tanto el frontend como el backend de la aplicación.


## Requisitos
- Docker
- Docker Compose

## Uso

1. Clona el repositorio en tu máquina local:

   git clone https://github.com/DanielRuiz96/ScheduleEvents.git


## Base de Datos en Docker

La aplicación utiliza una base de datos PostgreSQL que se ejecuta en un contenedor Docker para almacenar y gestionar los datos. A continuación, se proporciona información sobre cómo se configuró y se lanzó la base de datos en Docker:

### Detalles de la Base de Datos Docker

- **Sistema de Gestión de Contenedores:** Docker
- **Contraseña:** `a3sec`
- **Nombre de la base de datos:** `db_a3sec`
- **Nombre del Contenedor:** `database`
- **Puerto de la base de datos:**`5432`

## Ejecucion del Aplicativo

Ejecuta el siguiente comando de docker para crear la imagenes y contenedores de proyecto asociados en el archivo docker-compose.yml:

2. docker-compose up -d

## Base de Datos con Usuario Mock

La base de datos incluye un usuario "mock" (simulado) por defecto que puedes utilizar para probar la aplicación. Esto facilita la verificación del funcionamiento de la aplicación sin necesidad de crear usuarios reales.

### Credenciales del Usuario Mock

Puedes acceder a la aplicación utilizando las siguientes credenciales de usuario "mock":

- **Usuario:** `Daniel96`
- **Correo:** `Danirumo96@example.com`
- **Contraseña:** `123456789`

Estas credenciales son proporcionadas para simplificar el proceso de prueba y verificación. En un entorno de producción real, los usuarios reales deben registrarse y autenticarse con sus propias credenciales.

Asegúrate de que la base de datos esté en funcionamiento y de que las credenciales del usuario "mock" sean válidas para probar la funcionalidad de la aplicación.




