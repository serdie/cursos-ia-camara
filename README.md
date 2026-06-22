# Curso IA - Cámara de Comercio de Toledo

Plataforma interactiva para el curso de Inteligencia Artificial (120 horas) organizado por la Cámara de Comercio de Toledo para alumnos de entre 18 y 59 años.

## Requisitos Previos

- **Node.js**: Versión 18 o superior.
- **Firebase Project**: Necesitas un proyecto en Firebase con Authentication y Firestore habilitados.

## Instalación Local

1. **Instala las dependencias**:
   ```bash
   npm install
   ```

2. **Configuración de Variables de Entorno**:
   - Crea un archivo `.env.local` en la raíz del proyecto.
   - Añade tus credenciales:
     ```env
     GOOGLE_GENAI_API_KEY=tu_api_key_aqui
     GEMINI_API_KEY=tu_api_key_aqui
     ```

3. **Configuración de Firebase**:
   - Crea un proyecto nuevo en [console.firebase.google.com](https://console.firebase.google.com)
   - Habilita Authentication (Email/Password y Google)
   - Habilita Firestore Database
   - Copia las credenciales y pégalas en `src/firebase/config.ts`

## Ejecución

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:9003`.

## Estructura del Proyecto

- `src/app`: Rutas y páginas (Next.js App Router).
- `src/components`: Componentes de UI reutilizables (ShadCN).
- `src/ai`: Flujos de Genkit para las herramientas de IA.
- `src/firebase`: Configuración y hooks de Firebase.
- `src/lib`: Datos estáticos del curso y utilidades.

## Créditos

Creado por **Diego Gómez Marín** para el curso de IA de la Cámara de Comercio de Toledo.
