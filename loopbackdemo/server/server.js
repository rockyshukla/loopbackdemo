'use strict';
//const electron = require('electron');
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
// var FileStore11 = require('session-file-store')(session);
var LokiStore = require('connect-loki')(session);
var options = {path:'./server/session/session.db'};
//const url = require('url');
// const { compile } = require('nexe')

// compile({
//   input: './server/server.js',
//   build: true, //required to use patches
//   patches: [
//     async (compiler, next) => {
//       await compiler.setFileContentsAsync(
//         'lib/new-native-module.js',
//         'module.exports = 42'
//       )
//       return next()
//     }
//   ]
// }).then(() => {
//   console.log('success')
// })
var app = module.exports = loopback();




  // var session = require('express-session');
  // var RedisStore = require('connect-redis')(session);
  // var store = new RedisStore({ host: '127.0.0.1' });
  app.middleware('session', session({
      name:"loopback",
      store: new LokiStore(options),
      secret: "!@reerer123!@fjgfhgf",
      resave: true,
       saveUninitialized: true,
       cookie:{ path: '/', httpOnly: true, secure: false, maxAge: null }

  }));




// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// configure body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true}));

 app.use(loopback.token());


app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
