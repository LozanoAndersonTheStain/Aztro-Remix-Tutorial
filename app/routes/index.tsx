import { json, MetaFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getMovies } from "../data/data";

export const loader = async () => {
  const movies = await getMovies();
  return json({ movies });
};

export const meta: MetaFunction = () => {
  return [
    { title: "Movies" },
    {
      property: "og:title",
      content: "The most popular Movies",
    },
    {
      name: "description",
      content: "A collection of movies to watch.",
    }
  ]
}

export default function Index() {

  const { movies } = useLoaderData<typeof loader>();

  return (
    <div className="movies-grid">
      {movies.map((movie) => (
        <Link to={`/movies/${movie.id}`} key={movie.id}>
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
        </Link>
      ))}
    </div>
  );
}