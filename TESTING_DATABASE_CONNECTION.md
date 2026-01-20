# 📘 Guía Paso a Paso: Probar Conexión a MongoDB

## ✅ Resultado del Test Automático

La conexión a la base de datos fue probada exitosamente:

- ✅ Estado de conexión: **Activo (1)**
- 🗄️ Base de datos: **test**
- 🌐 Host: **ac-jysrwke-shard-00-01.rutroe0.mongodb.net**

---

## 🚀 Instrucciones para Probar la Conexión por tu Cuenta

### Método 1: Usando el Script de Prueba (Recomendado)

#### Paso 1: Verifica que tengas las dependencias instaladas

```bash
npm install dotenv
```

#### Paso 2: Ejecuta el script de prueba

```bash
npx tsx scripts/test-db-connection.ts
```

#### Paso 3: Verifica el resultado

Deberías ver algo como:

```
🔄 Testing database connection...

Connected to database development - mongodb+srv://...
✅ Connection successful!
📊 Connection state: 1
🗄️  Database name: test
🌐 Host: ac-jysrwke-shard-00-01.rutroe0.mongodb.net

🔌 Connection closed successfully
```

---

### Método 2: Desde una API Route de Next.js

#### Paso 1: Crea un archivo de prueba en tu API

Crea el archivo: `app/api/test-db/route.ts`

```typescript
import { connectToDatabase } from "@/database/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await connectToDatabase();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      details: {
        readyState: connection.connection.readyState,
        dbName: connection.connection.name,
        host: connection.connection.host,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
```

#### Paso 2: Inicia el servidor de desarrollo

```bash
npm run dev
```

#### Paso 3: Visita la ruta de prueba

Abre tu navegador y ve a:

```
http://localhost:3000/api/test-db
```

#### Paso 4: Verifica la respuesta JSON

Deberías ver:

```json
{
  "success": true,
  "message": "Database connection successful",
  "details": {
    "readyState": 1,
    "dbName": "test",
    "host": "ac-jysrwke-shard-00-01.rutroe0.mongodb.net"
  }
}
```

---

### Método 3: Usando MongoDB Compass (GUI)

#### Paso 1: Descarga MongoDB Compass

Descarga desde: https://www.mongodb.com/try/download/compass

#### Paso 2: Copia tu URI de conexión

Desde tu archivo `.env`:

#### Paso 3: Pega la URI en MongoDB Compass

1. Abre MongoDB Compass
2. Pega la URI en el campo de conexión
3. Haz clic en "Connect"

#### Paso 4: Explora tu base de datos

Podrás ver todas tus bases de datos, colecciones y documentos visualmente.

---

## 🔍 Interpretación de los Estados de Conexión

| Estado        | Valor | Significado                   |
| ------------- | ----- | ----------------------------- |
| Disconnected  | 0     | Sin conexión                  |
| **Connected** | **1** | **✅ Conectado exitosamente** |
| Connecting    | 2     | Conectando...                 |
| Disconnecting | 3     | Desconectando...              |

---

## ⚠️ Solución de Problemas Comunes

### Error: "MONGODB_URI must be set within .env"

**Solución:** Verifica que tu archivo `.env` existe y contiene:

```env
MONGODB_URI=mongodb+srv://...
```

### Error: "MongoServerError: bad auth"

**Solución:**

- Verifica que tu usuario y contraseña sean correctos
- Asegúrate de que tu IP esté en la lista blanca de MongoDB Atlas

### Error: "connect ETIMEDOUT"

**Solución:**

- Verifica tu conexión a internet
- Asegúrate de que MongoDB Atlas esté accesible
- Revisa las reglas de firewall

---

## 📝 Notas Importantes

1. **Seguridad:** Nunca subas tu archivo `.env` a GitHub (ya está en `.gitignore`)
2. **Caché de Conexión:** La función `connectToDatabase` usa caché para reutilizar conexiones
3. **Entorno:** La conexión muestra el entorno actual (`development`, `production`, etc.)
4. **Base de datos por defecto:** Si no especificas una base de datos en la URI, se usa `test`

---

## 🎯 Siguiente Paso

Una vez verificada la conexión, puedes:

1. Crear tus modelos de Mongoose
2. Implementar operaciones CRUD
3. Conectar tus API routes con la base de datos

¡Tu conexión a MongoDB está lista para usar! 🚀
