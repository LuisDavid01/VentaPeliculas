# Sistema de tiquetera para cines 🍿📽️
>[!NOTE]
>Actualmente esta bajo activo desarrollo!
***

## Introduccion
DISCLAIMER: **Este proyecto fue hecho con fines educativos**, **NADA** de este proyecto es **utlizado para generar un centimo** y le doy el credito a los creadores originales de los assets (como imagenes) que son utlizados en este proyecto.
</br>
![.NET Core](https://img.icons8.com/color/48/000000/net-framework.png)
![NodeJs](https://img.icons8.com/color/48/000000/nodejs.png)
![Express](https://img.icons8.com/ios/50/000000/express-js.png)
![Golang](https://img.icons8.com/color/48/000000/golang.png)
![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)
![Postgresql](https://img.icons8.com/?size=48&id=Pv4IGT0TSpt8&format=png&color=000000)
![Firebase](https://img.icons8.com/color/48/000000/firebase.png)
![Supabase](https://img.icons8.com/color/48/000000/supabase.png)
![Stripe](https://img.icons8.com/color/48/000000/stripe.png)
![Docker](https://img.icons8.com/color/48/000000/docker.png)
# Instalacion
### Docker (Instalacion recomendada)
1. instalar [docker](https://www.docker.com/)
2. Clonar el repositorio
```bash
git clone https://github.com/LuisDavid01/VentaPeliculas
```
3. Dentro de la raiz del proyecto se necesita un archivo .env con todas las variables de entorno para los contenedores. Puede consultar el archivo .env.example como referencia
4. se necesita un certificado ssl dentro de la carpeta ventaPeliculaWeb con el nombre "certificate.pfx", si desea correrlo de manera local.
5. Correr todos los contenedores.
```bash
docker compose up
```
5. listo! 😁👌
### Instalacion general
1. Se requiere de tener Node v22.13 instalado en su equipo Puede descargarlo desde [la pagina oficial](https://nodejs.org/en) o bien desde cualquier [Node Version Manager](https://github.com/nvm-sh/nvm) que prefiera.

2. Se requiere tener [.net core 8](https://dotnet.microsoft.com/es-es/download) instalado, use el IDE de su preferencia.

3. Clona el repositorio:
```bash
git clone https://github.com/LuisDavid01/VentaPeliculas
```
4. Revisar el archivo .env.example para ver como configurar las variables de entorno para correr el api

5. Instalacion de dependecias del api
  ```bash
  cd api
  npm install
  npm run start
  ```

6. Para usar stripe y sus webhooks como estan intencionados en el programa necesita [stripe cli](https://docs.stripe.com/stripe-cli) y una cuenta de prueba en stripe
   tener en una terminal separada, no olvidarse de colocar sus secretos en el .env del api.
```bash
stripe login
stripe listen -f http://localhost:8901/webhook
```
# Colaboradores
- Luis David Miranda Villalta (main developer)
