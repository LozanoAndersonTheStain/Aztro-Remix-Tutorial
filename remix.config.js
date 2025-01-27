module.exports = {
  appDirectory: "app",
  outputDirectory: "public/build",
  future: {
    v2_routeConvention: true,
  },
  ignoredRouteFiles: ["**/*.css, **/*.test.*"],
  publicPath: "/build/",
  routes: async (defineRoutes) => {
    return defineRoutes((route) => {
      route("/", "routes/index.tsx");
      route("/movies/:movieId", "routes/movies.$movieId.tsx");
      route("/movies/:movieId/edit", "routes/movies.$movieId_.edit.tsx");
    });
  },
  serverBuildPath: "build/index.js",
};