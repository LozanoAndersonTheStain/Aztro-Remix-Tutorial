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
        </Link>
      ))}
    </div>
  );
}