module.exports = {
  future: {
    v2_routeConvention: true,
  },
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      route("/", "routes/index.tsx");
      route("/home", "routes/home.tsx");
      route("/movies/:movieId", "routes/movies.$movieId.tsx");
    });
  },
};