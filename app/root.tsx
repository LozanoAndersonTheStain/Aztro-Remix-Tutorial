import type { LinksFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";

import {
  Form,
  Link,
  Links,
  NavLink,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";

import appStylesHref from "./app.css?url";
import { getMovies, createEmptyMovie } from "./data/data";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  const movies = await getMovies();
  return json({ movies });
};

export const action = async () => {
  const movie = await createEmptyMovie();
  return redirect(`/movies/${movie.id}/edit`);
};

export default function App() {
  const { movies } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

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
                    <NavLink
                      className={({ isActive, isPending }) => (isActive ? "active" : isPending ? "pending" : "")}
                      to={`movies/${movies.id}`}
                    >
                      <Link to={`movies/${movies.id}`}>
                        {movies.title ? <>{movies.title}</> : <i>No Title</i>}{" "}
                        {movies.favorite ? <span>★</span> : null}
                      </Link>
                    </NavLink>
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
        <div
          className={
            navigation.state === "loading" ? "loading" : ""
          }
          id="detail"
        >
          <Outlet />
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
