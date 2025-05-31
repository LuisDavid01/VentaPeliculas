# Sistema de tiquetera para cines 🍿📽️
>[!NOTE]
>Actualmente esta bajo activo desarrollo!
***
## Introduccion
![MongoDB](https://img.icons8.com/color/48/000000/mongodb.png)
![Firebase](https://img.icons8.com/color/48/000000/firebase.png)
![Stripe](https://img.icons8.com/color/48/000000/stripe.png)
![Express](https://img.icons8.com/ios/50/000000/express-js.png)
![.NET Core](https://img.icons8.com/color/48/000000/net-framework.png)
![NodeJs](https://img.icons8.com/color/48/000000/nodejs.png)
### Instalacion general
1. Se requiere de tener Node v22.13 instalado en su equipo Puede descargarlo desde [la pagina oficial](https://nodejs.org/en) o bien desde cualquier [Node Version Manager](https://github.com/nvm-sh/nvm) que prefiera.

2. Se requiere tener [.net core 8](https://dotnet.microsoft.com/es-es/download) instalado, use el IDE de su preferencia.

3. Clona el repositorio:
```bash
git https://github.com/LuisDavid01/VentaPeliculas
```
4. Revisar el archivo .env.example para ver como configurar las variables de entorno para correr el api

5. Instalacion de dependecias del api
   Alternativamente para desarrollo, usar npm run dev aunque aveces causa problemas.
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
 
  listo! 😁👌
