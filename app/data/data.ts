////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Remix, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function
import sortBy from "sort-by";
import invariant from "tiny-invariant";

type MovieMutation = {
  id?: string;
  title?: string;
  director?: string;
  poster?: string;
  releaseDate?: string;
  synopsis?: string;
  link?: string;
  favorite?: boolean;
};

export type MovieRecord = MovieMutation & {
  id: string;
  createdAt: string;
};

const fakeMovies = {
  records: {} as Record<string, MovieRecord>,

  async getAll(): Promise<MovieRecord[]> {
    return Object.keys(fakeMovies.records)
      .map((key) => fakeMovies.records[key])
      .sort(sortBy("-createdAt", "title"));
  },

  async get(id: string): Promise<MovieRecord | null> {
    return fakeMovies.records[id] || null;
  },

  async create(values: MovieMutation): Promise<MovieRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newMovie = { id, createdAt, ...values };
    fakeMovies.records[id] = newMovie;
    return newMovie;
  },

  async set(id: string, values: MovieMutation): Promise<MovieRecord> {
    const movie = await fakeMovies.get(id);
    invariant(movie, `No movie found for ${id}`);
    const updatedMovie = { ...movie, ...values };
    fakeMovies.records[id] = updatedMovie;
    return updatedMovie;
  },

  destroy(id: string): null {
    delete fakeMovies.records[id];
    return null;
  },
};

export async function getMovies(query?: string | null) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let movies = await fakeMovies.getAll();
  if (query) {
    movies = matchSorter(movies, query, {
      keys: ["title", "director"],
    });
  }
  return movies.sort(sortBy("title", "createdAt"));
}

export async function createEmptyMovie() {
  const movie = await fakeMovies.create({});
  return movie;
}

export async function getMovie(id: string) {
  return fakeMovies.get(id);
}

export async function updateMovie(id: string, updates: MovieMutation) {
  const movie = await fakeMovies.get(id);
  if (!movie) {
    throw new Error(`No movie found for ${id}`);
  }
  await fakeMovies.set(id, { ...movie, ...updates });
  return movie;
}

export async function deleteMovie(id: string) {
  fakeMovies.destroy(id);
}

[
  {
    poster: "https://i.ebayimg.com/thumbs/images/g/aVwAAOSwlEdmZZI0/s-l1200.jpg",
    title: "Inception",
    director: "Christopher Nolan",
    releaseDate: "2010-07-16",
    link: "https://cuevana.biz/pelicula/27205/el-origen",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology...",
  },
  {
    poster: "https://filmartgallery.com/cdn/shop/products/The-Matrix-Vintage-Movie-Poster-Original-French-1-panel-47x63.jpg?v=1680238937",
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    releaseDate: "1999-03-31",
    link: "https://cuevana.biz/pelicula/603/matrix",
    synopsis: "A computer hacker learns from mysterious rebels about the true nature of his reality...",
  },
  {
    poster: "https://images.squarespace-cdn.com/content/v1/657716dc6cd59d329f8cc943/1702303456952-89SVMRXKDUZ65S4279HJ/TSRL+Poster.jpg",
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    releaseDate: "1994-09-23",
    link: "https://cuevana.biz/pelicula/278/sueno-de-fuga",
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  },
  {
    poster: "https://www.thewestdale.ca/wp-content/uploads/2024/11/westdale_godfather_2.jpg",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    releaseDate: "1972-03-24",
    link: "https://cuevana.biz/pelicula/238/el-padrino",
    synopsis: "An organized crime dynasty's aging patriarch transfers control of his clandestine empire to his reluctant son.",
  },
  {
    poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEid2lRc4Tl3Apxj8darrwf6KeKiWcY67LCPbV3RSOkTymb_53uK_z2tMeUXxLd-2AiA4ktzkO747TaD0AYd10u_cHok0gm2aiTvRKRL1e3aHr3nZ9ZE7rDwhd6v3vI2W8ZprhVpkZGJ7lE/s1600/Cine+-+The+Dark+Knight+%25280%2529.jpg",
    title: "The Dark Knight",
    director: "Christopher Nolan",
    releaseDate: "2008-07-18",
    link: "https://cuevana.biz/pelicula/155/batman-el-caballero-de-la-noche",
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of his greatest challenges as a symbol of hope.",
  },
  {
    poster: "https://fr.web.img6.acsta.net/c_310_420/img/c0/23/c023b1dde271a455b4c5a93d0ae7497d.jpg",
    title: "The Beast Within",
    director: "Alexander J. Farrell",
    releaseDate: "2024-06-26",
    link: "https://cuevana.biz/pelicula/1300962/the-beast-within",
    synopsis: "After a series of strange events lead her to question her family's isolated life in a fortified compound deep in the English wilderness, 10-year-old Willow follows her parents on one of their secret nocturnal excursions into the heart of the ancient forest.",
  },
  {
    poster: "https://fr.web.img2.acsta.net/pictures/17/10/16/15/40/0883250.jpg",
    title: "Black Panther",
    director: "Ryan Coogler",
    releaseDate: "2018-02-16",
    link: "https://cuevana.biz/pelicula/284054/pantera-negra",
    synopsis: "T'Challa, the king of Wakanda, must step forward to lead his people into a new future and must confront a challenger from his country's past.",
  },
  {
    poster: "https://play-lh.googleusercontent.com/ktmAySdXZ8wC8d2PyJbbGDEqoJF9jBqnQU9rwszE43Qcoxvzjgk_KhNmmZ6ZKonb4lcP_OF0TtsmaAly8mU",
    title: "1974: Altair's possession",
    director: "Víctor Dryere, Omar Noceda, Fernando Barreda Luna, Sergio Marroquín, Fausto Muñoz",
    releaseDate: "2016-10-13",
    link: "https://cuevana.biz/pelicula/416079/1974-la-posesion-de-altair",
    synopsis: "A newlywed couple disappeared in 1974, their 8mm tapes reveal one of the most horrific events in Mexico's history.",
  },
  {
    poster: "https://es.web.img3.acsta.net/medias/nmedia/18/67/83/48/20084299.jpg",
    title: "The Haunting in Connecticut",
    director: "Peter Cornwell",
    releaseDate: "2009-03-27",
    link: "https://cuevana.biz/pelicula/18781/extranas-apariciones",
    synopsis: "After a remote diamond mine collapses in far northern Canada, a 'big-rig' ice road driver must lead an impossible rescue mission over a frozen ocean to save the trapped miners.",
  },
  {
    poster: "https://hips.hearstapps.com/hmg-prod/images/thanksgiving-881680111-large-64fd840007826.jpg",
    title: "Black Friday",
    director: "Eli Roth",
    releaseDate: "2023-11-17",
    link: "https://cuevana.biz/pelicula/1071215/viernes-negro",
    synopsis: "After a riot ends in tragedy on Black Friday, a mysterious Thanksgiving-inspired killer terrorizes Plymouth Massachusetts - the birthplace of that (American) holiday.",
  },
].forEach((movie) => {
  fakeMovies.create({
    ...movie,
    id: `${movie.title.toLowerCase().replace(/ /g, "-")}`,
  });
});