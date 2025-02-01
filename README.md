- [Remix Docs](https://remix.run/docs)

## Imagenes de referencia

![Captura de pantalla 2025-01-22 191915](https://github.com/user-attachments/assets/d34e1e30-e1f5-4aae-a68a-68f29af0a42b)
![Captura de pantalla 2025-01-22 193225](https://github.com/user-attachments/assets/b598d803-7c0f-4136-a9e3-ffa8cd5f3a7b)

## Pasos iniciales

* Paso 1: Clonar el repositorio: 
  
Primero, clona el repositorio desde GitHub (o cualquier otro sistema de control de versiones que estés utilizando) o tambien puedes crear un fork del proyecto original.

```sh
git clone https://github.com/your-username/aztro-remix-tutorial.git
```

* Paso 2: Posicionarse en la carpeta del proyecto:

```sh
cd aztro-remix-tutorial
```

* Paso 3: Instalar las dependencias:

```sh
npm install
```

* Paso 4: Iniciar la aplicación en el entorno de desarrollo:

```sh
npm run dev
```

* Paso 5: Visita [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

<br>

El proyecto está configurado para usar [Vite](https://vitejs.dev/) para el desarrollo y construcción de tu aplicación.


Ya con eso puedes realizar cualquier cambio que desees en tu aplicación.

### Agregar un nuevo estilo CSS

Por ejemplo, Realizar cambios en el proyecto

Aquí hay un ejemplo de cómo agregar un nuevo estilo CSS y modificar un componente.

1.  Abre el archivo app/styles/app.css y agrega un nuevo estilo:

```css
.new-style {
  color: red;
  font-size: 20px;
}
```

2.  Abre el archivo app/routes/index.tsx y agrega un nuevo componente o elemento:

```jsx
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getMovies } from "../data/data";

export const loader = async () => {
  const movies = await getMovies();
  return json({ movies });
};

export default function Index() {
  const { movies } = useLoaderData<typeof loader>();

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <p className="new-style">{movie.title}</p>
        </Link>
      ))}
    </div>
  );
}
```

3.  Guarda los archivos y verifica los cambios en tu navegador. Deberías ver los títulos de las películas en color rojo y con un tamaño de fuente de 20px.


## Compilar y desplegar la aplicación

1. Si quieres compilar y desplegar la aplicación, puedes ejecutar los comandos `npm run build` y `npm start` respectivamente.

2. Despliega la aplicación en tu servidor de producción preferido. Asegúrate de desplegar la salida de `remix build`:

- `build/server`
- `build/client`

## Resumen
1. Clonar el repositorio.
2. Instalar las dependencias.
3. Iniciar el servidor de desarrollo.
4. Realizar cambios en el proyecto.
5. Verificar los cambios.
6. Compilar y desplegar la aplicación.
7. Con estos pasos, deberías poder clonar, instalar y realizar  cambios en tu proyecto Remix.

<br>

Si quieres aprender más sobre Remix, puedes visitar [Remix Docs](https://remix.run/docs)

# Este proyecto es creado para fines educativos.
