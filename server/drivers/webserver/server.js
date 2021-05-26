const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes')
const config = require('../../config')
const tenantResolver = require('./middlewares/tenantResolver')
const httpLogger = require('./logger/httpLogger')
var url = require('url');

var unless = function(paths, middleware) {
  return function(req, res, next) {
    //var path = new url.URL(req.url).pathname
    var path = req.url
    //console.log("req.path", req.url )
    for(let i = 0; i < paths.length;i++){
      //checking * routes
      if(paths[i].indexOf('*') >= 0){
        if(path.includes(paths[i].replace('*','')) || path.includes(paths[i].replace('/*',''))){
          return next();
        }
      }
      else if (paths[i] === path) {
        return next();
      }
    }
    return middleware(req, res, next);
  };
};


// bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(httpLogger)

//avoid tenant check on those endpoints
app.use(unless(['/',
  '/boom',
  '/farms/*',
  '/farmndvis/*',
  '/farmprecipitations/*',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/swagger-ui.css',
  '/swagger-ui-bundle.js',
  '/swagger-ui-standalone-preset.js',
  '/swagger-ui-init.js',
  '/swagger.json'], tenantResolver.resolve));
app.use(routes)

// === BOILERPLATE ===
// Catch and send error messages
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message)
    if (!err.statusCode) {
      err.statusCode = 500
    } // Set 500 server code error if statuscode not set
    return res.status(err.statusCode).send({
      statusCode: err.statusCode,
      message: err.message
    })
  }

  next()
})

// 404
app.use(function (req, res) {
  res.status(404).json({
    status: 'Page does not exist'
  });
});

const PORT = config.PORT || 3000
const ENV = config.NODE_ENV

console.log("EVN", ENV)

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
})