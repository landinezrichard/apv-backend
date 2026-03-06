
# Administrador Pacientes de Veterinaria (APV) 🐶🐱​🐹​🐰​- Backend Node:

API Backend para administrar pacientes de veterinaria.

Tiene las siguientes características:

- Utiliza [Express](https://expressjs.com/es/).
- [Mongoose](https://mongoosejs.com/) como ORM (BD [Mongo]([title](https://www.example.com))).
- CRU (Sin Delete) de "Veterinario".
- CRUD de "Paciente".
- Hasheo Passwords.
- Autenticación con JSON Web Token (JWT) Bearer Token.
- Envio de emails de confirmación de cuenta y de recuperación de password.
___

## Run Server 🏃​

Para **desarrollo**: 

1) Instalar dependencias.
```
pnpm i
```
2) Crear en la raíz un archivo "**.env**", con las siguientes variables de entorno:
```
MONGO_URI=mongodb+srv://usuario_db_root:<db_password>@cluster.algo.mongodb.net/?appName=Cluster
JWT_SECRET=palabrasupersecreta456
FRONTEND_URL=http://localhost:PORT

EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=587
EMAIL_USER=nombreUsuarioMailtrap
EMAIL_PASS=passwordMailtrap
```

3) Correr servidor con:

```
pnpm run dev
```
___

Para **producción**: 

1) Repetir pasos No.1 y No.2 de desarrollo.

2) Correr servidor con:

```
pnpm run start
```
___

## Endpoints 🔚​
Endpoints de la API con rutas publicas ✅ y privadas ⛔​ (requieren login).

### Veterinarios 👨‍⚕️​👩‍⚕️​

✅ **Registrar Veterinario:** POST

```
/api/veterinarios
```

Recibe los siguientes datos:

```
{
    "nombre": "nombreVeterinario",
    "email": "correoveterinario@correo.com",
    "password": "password"
}
```

✅ **Confirmar cuenta via token:** GET

Recibe el token a través de la URL. Cuando el Veterinario da click en el enlace enviado a su correo despues del registro.

```
/api/veterinarios/confirmar/:token
```

✅ **Autenticar usuario (Login):** POST

```
/api/veterinarios/login
```

Recibe los siguientes datos:

```
{
    "email": "correoveterinario@correo.com",
    "password": "password"
}
```

✅ **Olvide Password:** POST

Comprueba si el usuario existe y genera un token para que el veterinario recupere acceso a la cuenta.

```
/api/veterinarios/olvide-password
```

Recibe los siguientes datos:

```
{
    "email": "correoveterinario@correo.com"
}
```

✅ **Validar Token - Olvide Password:** GET

Valida el token, cuando el Veterinario hace click en el enlace de su correo, para recuperar contraseña. Recibe el token a través de la URL.

```
/api/veterinarios/olvide-password/:token
```

✅ **Almacenar Nuevo Password:** POST

En la misma URL donde se Valida el token al olvidar la contraseña, el veterinario envia la nueva contraseña por formulario.

```
/api/veterinarios/olvide-password/:token
```

Recibe los siguientes datos:

```
{
    "password": "nuevoPassword"
}
```

⛔ **Perfil:** GET

Consulta la información del Veterinario (requiere autenticar - Bearer token).

```
/api/veterinarios/perfil
```

⛔ **Actualizar Perfil:** PUT

Actualiza la información del Veterinario (requiere autenticar - Bearer token).

```
/api/veterinarios/perfil:id
```
Recibe el "id" del Veterinario a través de la URL.

Recibe los siguientes datos:

```
{
    "nombre": "nombreVeterinario",
    "email": "correoveterinario@correo.com",
    "telefono": "telefono",
    "web": "sitioWeb"
}
```

⛔ **Actualizar/Cambiar Password:** PUT

Cambia el password del Veterinario (requiere autenticar - Bearer token).

```
/api/veterinarios/actualizar-password
```

Recibe los siguientes datos:

```
{
    "pwd_actual": "passwordActual",
    "pwd_nuevo": "passwordNuevo"
}
```

### Pacientes 🐶​🐱​🐹​🐰

⛔ **Crear Paciente:** POST

Crea un nuevo Paciente (requiere autenticar el Veterinario - Bearer token).

```
/api/pacientes
```

Recibe los siguientes datos:

```
{
    "nombre": "nombrePaciente",
    "propietario": "nombrePropietario",
    "email": "correopropietario@correo.com",
    "sintomas": "sintomasPacientes"
    "fecha": "fechaAlta"
}
```

⛔ **Obtener los Pacientes:** GET

Obtiene los pacientes de un Veterinario logueado (requiere autenticar el Veterinario - Bearer token).

```
/api/pacientes
```

⛔ **Obtener un Paciente:** GET

Obtiene el paciente indicado con el "id" enviado por URL (requiere autenticar el Veterinario - Bearer token).

```
/api/pacientes/:id
```

Recibe el "id" del Paciente a través de la URL.

⛔ **Actualizar Paciente:** PUT

Actualiza la información del Paciente (requiere autenticar el Veterinario - Bearer token).

```
/api/pacientes/:id
```

Recibe el "id" del Paciente a través de la URL.

Recibe los siguientes datos:

```
{
    "nombre": "nombrePaciente",
    "propietario": "nombrePropietario",
    "email": "correopropietario@correo.com",
    "sintomas": "sintomasPacientes"
    "fecha": "fechaAlta"
}
```

⛔ **Eliminar Paciente:** DELETE

Elimina la información del Paciente de la BD (requiere autenticar el Veterinario - Bearer token).

```
/api/pacientes/:id
```

Recibe el "id" del Paciente a través de la URL.






