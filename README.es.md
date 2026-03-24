# Authxolote - Sistema de Autenticación y Gestión de Roles

Authxolote es una API robusta construida con Laravel 12 que proporciona un sistema de gestión de autenticación, roles y permisos (RBAC) listo para usar. Utiliza Laravel Passport para la emisión de tokens OAuth2 y un sistema dinámico llamado "Flow" para la gestión de recursos.

## 🚀 Requisitos Previos

- PHP >= 8.4
- Composer
- MySQL / PostgreSQL / SQLite
- Node.js & NPM (opcional, para compilación de assets si fuera necesario)

## 🛠️ Instalación y Configuración

Sigue estos pasos para poner en marcha el proyecto:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/AxoloteSource/Authxolote
   cd Authxolote
   ```

2. **Instalar dependencias:**
   ```bash
   composer install
   ```

3. **Configurar el entorno:**
   Copia el archivo de ejemplo y configura tus credenciales de base de datos.
   ```bash
   cp .env.example .env
   ```
   Genera la clave de la aplicación:
   ```bash
   php artisan key:generate
   ```

4. **Migraciones y Seeders:**
   Ejecuta las migraciones para crear las tablas necesarias, incluyendo las de Passport.
   ```bash
   php artisan migrate --seed
   ```

5. **Instalar Laravel Passport:**
   Genera las claves de cifrado necesarias para los tokens de acceso personal y clientes.
   ```bash
   php artisan passport:install
   ```

6. **Iniciar el servidor:**
   ```bash
   php artisan serve
   ```

---

## 🏗️ Arquitectura y Modelos

### Modelos Principales
- **User**: Representa a los usuarios del sistema. Cada usuario tiene asignado un `role_id`.
- **Role**: Define los roles disponibles (ej. Root, Admin, User).
- **Action**: Representa un permiso o acción específica dentro del sistema (ej. `auth.role.index`).
- **Setting**: Sistema de configuración dinámica.
- **SettingValueType**: Define los tipos de valores para las configuraciones.

### Middleware `IsAllow`
El sistema utiliza un middleware personalizado (`App\Core\Middleware\IsAllow`) para verificar si el usuario autenticado tiene el permiso (`Action`) necesario para ejecutar una ruta específica.

---

## 📡 Documentación de APIs

Todas las APIs se encuentran bajo el prefijo `/api`.

### 🔐 Autenticación (`routes/modules/auth.php`)

| Método | Endpoint | Descripción | Requiere Auth |
|---|---|---|---|
| POST | `/login` | Inicia sesión y devuelve un token de Passport. | No |
| POST | `/register` | Registra un nuevo usuario. | No |
| POST | `/logout` | Revoca el token de acceso actual. | Sí |
| POST | `/me` | Obtiene la información del usuario autenticado. | Sí |
| POST | `/is-allowed` | Verifica si el usuario tiene un permiso específico. | Sí |

### 👥 Gestión de Roles (`routes/modules/roles.php`)

Requiere autenticación mediante Bearer Token.

| Método | Endpoint | Descripción | Permiso Requerido |
|---|---|---|---|
| GET | `/roles` | Lista todos los roles. | `auth.role.index` |
| POST | `/roles/attach/actions` | Asigna acciones/permisos a un rol. | `auth.role.attach.actions` |
| GET | `/roles/{id}/actions` | Lista las acciones asociadas a un rol. | `auth.role.actions.index` |
| PUT | `/roles/{id}/actions/{actionId}` | Actualiza una acción específica de un rol. | `auth.role.actions.update` |

### 🌊 Flow API (`routes/modules/flow.php`)

Flow es un sistema dinámico que permite realizar operaciones CRUD sobre modelos registrados de forma genérica.

**Modelos soportados actualmente:** `actions` (pueden añadirse más en `FlowIndexLogic.php`).

| Método | Endpoint | Descripción | Permiso Requerido |
|---|---|---|---|
| GET | `/{model}` | Lista registros del modelo con soporte para búsqueda y paginación. | `auth.flow.index` |
| POST | `/{model}` | Crea un nuevo registro en el modelo. | `auth.flow.store` |
| GET | `/{model}/{id}` | Obtiene un registro específico por ID. | `auth.flow.show` |
| PUT | `/{model}/{id}` | Actualiza un registro existente. | `auth.flow.update` |
| DELETE | `/{model}/{id}` | Elimina un registro (soporta SoftDelete). | `auth.flow.delete` |

---

## 🛠️ Tecnologías Utilizadas

- **Laravel 12**: Framework principal.
- **Laravel Passport**: Autenticación OAuth2.
- **Spatie Laravel Data**: Para la transferencia de datos estructurados (DTOs).
- **Laravel Idea**: Soporte para desarrollo en IDE.

## 📦 SDK
Puedes usar el SDK oficial para una integración más rápida: [Authxolote SDK](https://github.com/AxoloteSource/authxolote-sdk)

---

## 📄 Licencia
Este proyecto es software de código abierto bajo la licencia [MIT](https://opensource.org/licenses/MIT).
