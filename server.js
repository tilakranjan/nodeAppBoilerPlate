const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path    = require('path');
const app     = express();
const bodyParser= require('body-parser');
const methodOverride = require('method-override');
const config  = require('./config.js');
const hogan   = require('hogan-express');
const routes  = require('./routes/index.js');
const morgan  = require('morgan');
const fileUpload = require('express-fileupload');
var helmet = require('helmet');
const csrfProtection = require('csurf');

// app.use(morgan('combined'))
app.use(fileUpload());
app.use(helmet())

app.engine('mustache', hogan);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.set('partials', {
  header: 'partials/header',
  footer: 'partials/footer'
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({secret: config.sessionSecretCode,
  resave: false,
  store: new RedisStore({host:'127.0.0.1',port:6379}),
  saveUninitialized: true,
  cookie: { secure: config.secureSessionCookie }
}));
app.use(csrfProtection());
// this is native express error handler;
// More details can be found here : http://expressjs.com/en/guide/error-handling.html
app.use(methodOverride());
app.use(function (err, req, res, next) {
  console.log('MIDDLE WARE ERROR REPORT : ',err.message);
  if (req.xhr || req.headers['content-type'].indexOf('json') > -1 || req.headers['content-type'].indexOf('x-www-form-urlencoded')>-1){
    res.status(500).send({ success:false,error: err.message });
  }
  else {
    var data ={title:'Error!'};
    res.render('went-wrong-error',data);
  }
});
//    CUSTOM ERROR HANDLING ENDS HERE

routes(app);

app.get('*', function(req, res){
  res.status(404).render('404.mustache',{title:'Not found'});
});
// Listen for requests
app.listen(config.port, ()=> {
  console.log('Server spinning on :' + config.port);
  console.log('Mode               :' + (process.env.NODE_ENV=='production'?'PRODUCTION':'DEVELOPMENT'));
});

// nodemon -e .mustache,.css,.js server.js
/* A good team is a group of people , that makes better decisions as a whole than we would individually make for some of the parts . The programmers of tomorrow are the wizards of the future. */

module.exports = app;
