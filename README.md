🗺️ Monitoreo de Antennas en Guayaquil

Este repositorio contiene el código fuente de una aplicación web sencilla para monitorear antenas de telecomunicaciones distribuidas en la ciudad.

⚙️ Pasos para ejecutar el proyecto

- Clonar el repositorio: git clone o descargar el fuente
- Instalar dependencias con el comando: npm install
- Ejecutar el servidor de desarrollo: npm run dev

💻 Tecnologías Utilizadas
- Vite: Entorno de desarrollo con vanilla Typescript.
- DataTables: Visualización de tablas.
- Mapbox GL JS: Renderizado de mapas.
- Zod: Validación de esquemas para los datos de la API.

🛠️ Partes Principales del Proyecto
El proyecto sigue un patrón de separación de responsabilidades para facilitar el mantenimiento y la escalabilidad:

1. Validación de Esquema (Zod)
Para garantizar la integridad de la aplicación, implementamos un sistema de validación en tiempo de ejecución.
- Ubicación: src/types/antenna.type.ts
  
2. Consumo del endpoint (API)
Se utiliza fetch para realizar peticiones asíncronas hacia MockAPI, para procesa la respuesta y aplica la validación del esquema de Zod antes de retornar los datos
- Ubicación: src/api/antennas.apis.ts

3. Visualización Geográfica (Mapbox GL JS)
Componente encargado de la representación de las antenas. Permitiendo transformar las coordenadas obtenidas de la API en marcadores interactivos sobre un mapa base, centrado en la ciudad de Guayaquil.
- Ubicación: src/map/map.ts

4. Gestión de Datos en Tabla (DataTables)
Ofrece una gestion de los datos consumido de la api mediante de la representación de una tabla con capacidades de búsqueda rápida y filtrado de las antenas.
- Ubicación: src/main.ts (Inicialización)


