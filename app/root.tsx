import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import {
  Form,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";
import { getMovies } from "./data/data";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  const movies = await getMovies();
  return json({ movies });
};

export default function App() {
  const { movies } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="sidebar">
          <h1>Remix Movies</h1>
          <div>
            <Form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search movies"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div id="search-spinner" aria-hidden hidden={true} />
            </Form>
            <Form method="post">
              <button type="submit">New</button>
            </Form>
          </div>
          <nav>
            <Link to="./index">Home</Link>
            {movies.length ? (
              <ul>
                {movies.map((movies) => (
                  <li key={movies.id}>
                    <Link to={`movies/${movies.id}`}>
                      {movies.title ? (
                        <>
                          {movies.title}
                        </>
                      ) : (
                        <i>No Title</i>
                      )}{" "}
                      {movies.favorite ? <span>★</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No movies</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail">
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
