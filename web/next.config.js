module.exports = {
  images: {
    domains: ["image.tmdb.org"],
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
}
