import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import invariant from "tiny-invariant";

import type { MovieRecord } from "../data/data";

import { getMovie } from "../data/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.movieId, "Missing movieId param");
  const movie = await getMovie(params.movieId);
  if (!movie) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ movie });
};

export default function Movie() {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <div id="movie">
      <div>
        <img
          alt={`${movie.title} poster`}
          key={movie.poster}
          src={movie.poster}
        />
      </div>

      <div>
        <h1>
          {movie.title ? (
            <>
              {movie.title}
            </>
          ) : (
            <i>No Title</i>
          )}{" "}
          <Favorite movie={movie} />
        </h1>

        {movie.director ? (
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
        ) : null}

        {movie.releaseDate ? <p>{movie.synopsis}</p> : null}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>

          <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record."
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>

          <a href={movie.link}>
            <button type="button">See Movie</button>
          </a>
        </div>
      </div>
    </div>
  );
}

const Favorite: FunctionComponent<{
  movie: Pick<MovieRecord, "favorite">;
}> = ({ movie }) => {
  const favorite = movie.favorite;

  return (
    <Form method="post">
      <button
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        name="favorite"
        value={favorite ? "false" : "true"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
};
