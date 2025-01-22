## Algunos conceptos importantes por ahora

### Links
Los **Links** en Remix se utilizan de dos formas principales dependiendo del contexto en el que se apliquen:

- **Links externos**: Se utilizan para enlazar recursos como hojas de estilo o scripts externos. Estos pueden ser globales para toda la aplicación o específicos para una parte de la misma.

  **Ejemplo:**
  ```jsx
  import { LinksFunction } from "@remix-run/node";
  import { Links } from "@remix-run/react";

  export const links: LinksFunction = () => [
    { rel: "stylesheet", href: "/styles/app.css" },
  ];

  export default function App() {
    return (
      <html lang="en">
        <head>
          <Links />
        </head>
        <body>
          {/* ... */}
        </body>
      </html>
    );
  }
  ```

- Obten mas informacion sobre `Links`: [Links](https://remix.run/docs/en/main/route/links)

  - **Links internos**: Se utilizan para redirigir a diferentes partes de la aplicación mediante la etiqueta `Link`. Por ejemplo, en una barra de navegación, se puede utilizar para redirigir a una página de detalles de una película al hacer clic en su título.
   
    **Ejemplo**:

    ```jsx
    import { Link } from "@remix-run/react";

    export default function Index() {
    return (
        <nav>
        <ul>
            <li>
            <Link to="/peliculas">Películas</Link>
            </li>
        </ul>
        </nav>
    );
    }
    ```

- Obten mas informacion sobre `Link`: [Link](https://remix.run/docs/en/main/components/link)


* **Loaders**: Los loaders en Remix son funciones que se ejecutan en el servidor para cargar los datos antes de que el componente asociado sea renderizado en el cliente. Esto permite manejar la carga de datos de manera eficiente y centralizada.

  * Ejemplo:

    ```jsx
    import { json } from "@remix-run/node";
    import { useLoaderData } from "@remix-run/react";

    export const loader = async () => {
    const data = await fetchData();
    return json(data);
    };

    export default function Component() {
    const data = useLoaderData<typeof loader>();
    return <div>{JSON.stringify(data)}</div>;
    }
    ```

- Obten mas informacion sobre `Loaders`: [Loaders](https://remix.run/docs/en/main/route/loader)

* **Rutas Dinamicas**: Las rutas dinámicas permiten renderizar diferentes componentes en función de parámetros obtenidos de la URL. Estas rutas se definen utilizando un formato como `[parametro].jsx`, donde el nombre del archivo corresponde al parámetro dinámico.

    **Ejemplo**:

    ```jsx
    import { useLoaderData } from "@remix-run/react";
    import { json } from "@remix-run/node";
    import { getMovie } from "../data/data";

    export const loader = async ({ params }) => {
    const movie = await getMovie(params.movieId);
    return json({ movie });
    };

    export default function Movie() {
    const { movie } = useLoaderData<typeof loader>();
    return <div>{movie.title}</div>;
    }
    ```

* **Rutas Anidadas**: Las rutas anidadas permiten estructurar la jerarquía de las páginas, donde una ruta principal puede contener subrutas. Para lograrlo, se utiliza el componente ``<Outlet/>``, que actúa como un marcador de posición que será reemplazado por el contenido de la subruta activa.

    **Ejemplo**:

    ```jsx
    import { Outlet } from "@remix-run/react";

    export default function Admin() {
    return (
        <div>
        <h1>Admin Panel</h1>
        <Outlet />
        </div>
    );
    }
    ```

- Obten mas informacion sobre `Rutas anidadas`: [Rutas anidadas](https://www.fixtergeek.com/blog/como-activar-el-link-correspondiente-segun-la-ruta-que-coincida-en-rutas-anidadas-de-remix/)

* **Componente Outlet**: El componente `<Outlet />` se utiliza en rutas anidadas para renderizar dinámicamente el contenido correspondiente a la subruta activa. Este componente es esencial para manejar la jerarquía y estructura de las rutas en Remix.

  * Ejemplo:
    ```jsx
    import { Outlet } from "@remix-run/react";

    export default function Admin() {
    return (
        <div>
        <h1>Admin Panel</h1>
        <Outlet />
        </div>
    );
    }
    ```

* Obten mas informacion de `Outlet` en: [Outlet](https://remix.run/docs/en/main/components/outlet)