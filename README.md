# MUSICAPP
Este proyecto fue desarrollado con NodeJS + Express + MongoDB 

# Screenshot

![Preview 00](/screenshot/preview_00.jpg)

![Preview 01](/screenshot/preview_01.jpg)

# Requisitos funcionales
Para hacer funcionar la aplicación se requiere tener instalado, como requisito lo siguiente:
* Requisitos minimos
  * NodeJS +14.x.x (o superior)
  * npm
  * Browser (Google Chrome, Firefox, etc.)
* Requisitos adicionales
  * docker
  * docker-compose
  * vagrant
  * MongoDB

# Configuración Backend
Es necesario crear un archivo `.env` del proyecto de backend dentro del path **/**(raíz), opcionalmente puede hacer una copia del archivo `.env.example` con el nombre de **.env** que incluyen variables de entorno <br> 

### Variables de entorno para proyecto | Musicapp
*  **APP_PORT** *(Requerido)* Puerto para la aplicación por defecto es `3015`

### Variables de entorno para base de datos | MongoDB Atlas
*  **APP_DB_USER** *(Requerido)*  
*  **APP_DB_PASSWORD** *(Requerido)* 
*  **APP_DB_DATABASE** *(Requerido)*

### Variables de entorno para base de datos | Otros
*  **APP_DB_URI** *(Opcional)* <br/> Solo en caso de requerir usuario y contraseña, por ejemplo: `mongodb://<user>:<password>@<host>:<port>/<database>?<options>`. Este variable de entorno anula los anteriores. <br>
El URI por defecto es mongodb://user_vagrant:pass@service_db/db_vagrant?authSource=admin

# Configuración ngrok
Es necesario crear un archivo `ngrok.yml` para el servicio __service_app__ en la ruta **./** (raíz). Opcionalmente puede hacer una copia del archivo `ngrok.yml.example` con el nombre de **.ngrok.yml**, la configuración necesario es la siguiente:<br> 

*  **authtoken** *(Requerido)* Token de autenticación generado y proporcionado por la plataforma de __ngrok__.
*  **addr** *(Requerido)* Es el puerto a exponer. En este caso el servicio __*service_app*__ con el puerto __*3015*__ por defecto.
  
```text
authtoken: <your_ngrok_auth_token>
tunnels:
  my-tunnel:
    proto: http
    addr: service_app:3015
```

## Correr aplicación de forma independiente (Usando npm)
#### Configuración previa
Antes de ejecutar la aplicación es necesario configurar el archivo `.env` en la ruta **./** (raíz), la configuración necesario es la siguiente:

```text
# MusicApp
APP_PORT=3015 # Puerto para Music App

# Database para Servidor de MongoDB Atlas
APP_DB_USER="<user>"
APP_DB_PASSWORD="<password>"
APP_DB_DATABASE="<database>"

# Database para Servidor Local
APP_DB_URI="mongodb://user_musicapp:pass@service_db/db_musicapp?authSource=admin"  # Opcional
```

#### Iniciar la aplicación
Es necesario ejecutar el comando  dentro del path para iniciar la aplicación **./** (raíz)
```shell
    npm run start
```
## Correr aplicación de forma automatizada (Usando docker-compose)
Es necesario ejecutar el siguiente comando desde donde se encuetra el archivo **docker-compose.yml** 

#### Configuración previa
Antes de ejecutar los proyectos es necesario configurar el archivo `.env` en la ruta **./musicapp*, la configuración necesario es la siguiente:

```text
# MusicApp
APP_PORT=3015 # Puerto para Music App

# Database para Servidor de MongoDB Atlas
APP_DB_USER="<user>"
APP_DB_PASSWORD="<password>"
APP_DB_DATABASE="<database>"

# Database para Servidor Local
APP_DB_URI="mongodb://user_musicapp:pass@service_db/db_musicapp?authSource=admin"  # Opcional
```

##### Esto construye y corre la aplicación en segundo plano
```shell
   docker-compose build && docker-compose up -d
```

##### Esto detiene y elimina la aplicación
```shell
   docker-compose stop -f && docker-compose rm -f
```

## Correr aplicación de forma automatizada (Usando vagrant)
#### **Nota**
Es necesario ejecutar el siguiente comando desde la directorio/carpeta raíz donde se encuetra el archivo **docker-compose.yml** 

Cabe mencionar que el archivo **docker-compose.yml** es creado y configurado especificamente para ejecutarse dentro de vagrant.
Así tambien el comando "vagrant up" o "vagrant reload", levanta los servicios definidas en el archivo **docker-compose.yml** (Por defecto).

#### Configuración previa
Antes de ejecutar los proyectos es necesario configurar el archivo `.env` en la ruta **./musicapp*, la configuración necesario es la siguiente:

```text
# MusicApp
APP_PORT=3015 # Puerto para Music App

# Database para Servidor de MongoDB Atlas
APP_DB_USER="<user>"
APP_DB_PASSWORD="<password>"
APP_DB_DATABASE="<database>"

# Database para Servidor Local
APP_DB_URI="mongodb://user_musicapp:pass@service_db/db_musicapp?authSource=admin"  # Opcional
```

##### Crear maquina virtual
Este comando crea una maquina virtual usando **'vagrant'** para correr *docker* y *docker-compose* dentro de ella. <br>
Por tal motivo, este comando se debe ejecutar una sola vez. 
```shell
   vagrant up 
```

##### Construir y levantar el proyecto
Este comando reinicia la maquina virtual usando **'vagrant'**, asi también ejecuta la provision *run-workspace* definida en el archivo *Vagrantfile*. <br>
+ *run-workspace* : Suspende, Elimina, Contruye y Levanta los servicios de *__docker-compose__* en el mismo orden. <br>

Por tal motivo, este comando se puede ejecutar las veces que sean necesarias. 

```shell
   vagrant reload 
```
