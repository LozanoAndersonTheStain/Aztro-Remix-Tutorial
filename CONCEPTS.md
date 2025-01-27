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

<br>

- **Links internos**: Se utilizan para redirigir a diferentes partes dela aplicación mediante la etiqueta `Link`. Por ejemplo, en una barra denavegación, se puede utilizar para redirigir a una página de detallesde una película al hacer clic en su título.
   
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

<br>

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

<br>

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

<br>

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

<br>

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

<br>

* **Action**: Esta es una funcion que se ejecuta en el servidor al momento de enviar un formulario desde un formulario desde la interfaz de cualquier aplicacion.
  Esta sirve para procesar, validar y guardar los datos ingresados por el usuario.

  * Ejemplo:
    Cuando un usuario llena un formulario de incripcción a una platarforma o se loguea en una red social y le da click en enviar el formulario, el `action` se ejecuta, recibe los datos, los verifica, los almacena y luego redirecciona al usuario a la pagina de inicio.

- Obten mas informacion sobre `Action`: [Action](https://remix.run/docs/en/main/route/action)

<br>

* **userLoaderData**: Este es un hook que se utiliza para acceder a los datos que han sido cargados por el `Loader` de una ruta. Ademas, gracias a este es que se permite mostrar la información de un usuario logueado en la interfaz de la aplicación, como por ejemplo en los perfiles de facebook.

- Obten mas informacion sobre `userLoaderData`: [userLoaderData](https://remix.run/docs/en/main/hooks/use-action-data)

<br>

* **useActionData**: Este es un hook que se utiliza tambien despues de que un formulario ha sido enviado y la solicitud ha sido procesada. Este es mas que todo utilizado para mostrar mensajes de éxito o de error en la interfaz de la aplicación.

- Obten mas informacion sobre `useActionData`: [useActionData](https://remix.run/docs/en/main/hooks/use-action-data)

<br>

* **Invariant**: Esta es una de las tantas utilidades que encontramos en Remix, es utilizada para realizar validacion de condiciones y permite lanzar errores si los campos donde se realiza la validacion no las cumplen. Es muy útil para asegurarse de que el código tenga los fatos que son necesarios y se cumplan los requisitos, lo cual ayuda a evitar diversos errores que no esperamos que sucedan. 