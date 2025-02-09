# Descripción

MVP para un Proyecto de Facturación Electrónica

## Ejecución en modo desarrollo

Este proyecto está compuesto por un **backend** utilizando **Nest.js** y un **frontend** con **Next.js**. Para su correcta ejecución, es necesario generar claves para las variables de entorno (se recomienda usar el comando `openssl rand -base64 32`) y configurar las credenciales de un proyecto de Google para la autenticación OAuth. A continuación se describen los pasos necesarios para configurarlo.

### Requisitos previos

1. Clonar el repositorio en tu máquina local.
2. Tener **Docker** en funcionamiento (se recomienda usar Docker Desktop).

### Configuración en la carpeta del backend

1. Copia el archivo `.env.template` y renómbralo como `.env`.
2. En el archivo `.env`, agrega las siguientes claves:

   - **JWT_SECRET**: Llave secreta para la firma de los tokens JWT.
   - **REFRESH_JWT_SECRET**: Llave secreta para los tokens de refresco.

3. Configura las credenciales de Google en la [Consola de Google](https://console.cloud.google.com/). En la sección de **Credenciales**, establece:

   - **Authorized JavaScript origins**.
   - **Authorized redirect URIs**.

4. Obtén las credenciales de OAuth 2.0 y añade las siguientes variables al archivo `.env`:

   - **GOOGLE_CLIENT_ID**.
   - **GOOGLE_CLIENT_SECRET**.
   - **GOOGLE_CALLBACK_URL**.

5. Instala las dependencias del backend con el siguiente comando: `npm install`.

6. Levanta la base de datos utilizando Docker: `docker-compose up -d`.

7. Ejecuta las migraciones de Prisma: `npx prisma migrate dev`.

8. Inicia el backend en modo desarrollo: `npm run dev`.

### Configuración en la carpeta del frontend

1. Copia el archivo `.env.template` y renómbralo como `.env`.

2. En el archivo .env, agrega la siguiente clave:

   - **SESSION_SECRET_KEY**: Llave secreta para las sesiones.

3. Instala las dependencias del frontend: `bash npm install`.

4. Inicia el frontend en modo desarrollo: `npm run dev`.
