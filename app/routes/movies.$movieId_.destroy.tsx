import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteMovie } from "../data/data";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.movieId, "Missing movieId param");
  await deleteMovie(params.movieId);
  return redirect("/");
};
