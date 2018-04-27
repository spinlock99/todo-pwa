const express = require("express")
const path = require("path")
const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")

const config = require(path.join(__dirname + "/webpack.dev.js"))
const app = express()
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: "bundle.js",
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
}))
app.use(webpackHotMiddleware(compiler, {
  log: console.log,
  path: "/__webpack_hmr",
  heartbeat: 10 * 1000
}))
app.get("*", function (req, res, next) {
  compiler.outputFileSystem.readFile(
    path.join(__dirname, "index.html"),
    function (err, result) {
      if (err) { return next(err) }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    }
  )
})

app.listen(8080, function () {
  console.log("todo pwa dev-server listening on port 8080")
})
