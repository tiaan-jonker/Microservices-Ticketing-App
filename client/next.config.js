// to ensure changes are detected
// setting to poll all files once every 300ms
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions.poll = 300
    return config
  }
}