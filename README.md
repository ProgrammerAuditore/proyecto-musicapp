# MUSICAPP
Este proyecto fue desarrollado con NodeJS + Express + MongoDB : [ver proyecto](https://app-musicapp.herokuapp.com)

# Requisitos funcionales
Para hacer funcionar la aplicación se requiere tener instalado, como requisito lo siguiente:
* NodeJS +14.x.x (o superior)
* npm
* MongoDB (local o remoto)
* Browser (Google Chrome, Firefox, etc.)
 
# Configuración Backend
Es necesario crear un archivo `.env` del proyecto de backend dentro del path **/**(raíz), opcionalmente puede hacer una copia del archivo `.env.example` con el nombre de **.env** que incluyen variables de entorno <br> 
Finalmente las variables de entorno son: 
### Variables de entorno para API | mascota
*  **APP_PORT** *(Requerido)* Puerto para la aplicación por defecto es `3000`

### Variables de entorno para Mongo | base de datos
*  **APP_DB_USER** *(Requerido)*  
*  **APP_DB_PASSWORD** *(Requerido)* 
*  **APP_DB_DATABASE** *(Requerido)*
*  **APP_DB_URI** *(Opcional)* <br/> Solo en caso de requerir usuario y contraseña, por ejemplo: `mongodb://<user>:<password>@<host>:<port>/<database>?<options>`. Este variable de entorno anula los anteriores.

## Correr aplicación de forma independiente (Usando npm)
#### Configuración previa
Antes de ejecutar la aplicación es necesario configurar el archivo `.env` en la ruta **./** (raíz), la configuración necesario es la siguiente:
```text
# MusicApp
APP_PORT=<port>

# Database MongoDB Atlas
APP_DB_USER="<user>"
APP_DB_PASSWORD="<password>"
APP_DB_DATABASE="<database>"
#APP_DB_URI="<uri (es opcional)>"
```

#### Iniciar la aplicación
Es necesario ejecutar el comando  dentro del path para iniciar la aplicación **./** (raíz)
```shell
    npm run start
```
