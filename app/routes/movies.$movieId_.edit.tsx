import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getMovie, updateMovie } from "../data/data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.movieId, "Missing movieId param");
  const movie = await getMovie(params.movieId);
  if (!movie) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ movie });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.movieId, "Missing movieId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateMovie(params.movieId, updates);
  return redirect(`/movies/${params.movieId}`);
};

export default function MovieEdit() {
  const { movie } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={movie.id} id="movie-form" method="post">
      <p>
        <span>Name: </span>
        <input
          aria-label="Title Movie"
          defaultValue={movie.title}
          name="title"
          placeholder="Title Movie"
          type="text"
        />
      </p>
      <label>
        <span>Director: </span>
        <input
          aria-label="Director"
          defaultValue={movie.director}
          name="director"
          placeholder="director"
          type="text"
        />
      </label>
      <label>
        <span>Synopsis: </span>
        <textarea
          defaultValue={movie.synopsis}
          name="synopsis"
          placeholder="Synopsis"
          rows={6}
        />
      </label>
      <label>
        <span>Poster URL</span>
        <input
          aria-label="Poster URL"
          defaultValue={movie.poster}
          name="poster"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Cuando se estreno:</span>
        <input
          defaultValue={movie.releaseDate}
          name="releaseDate"
          type="date"
        />
      </label>
      <label>
        <span>Link para ver la pelicula:</span>
        <input defaultValue={movie.link} name="link" />
      </label>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}
