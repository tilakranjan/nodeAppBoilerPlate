const api_routes = require('./api-routes.js');
const Joi        = require('joi');
const jwt        = require('jsonwebtoken');
const config     = require('../config.js');
const isSessionProtected  = require('../helpers/sessionProtected.js');
const controller = require('../controller/index.js');
const helpers    = require('../helpers/commonfunctions');
const QRCode     = require('qrcode');

const routes =(app)=>{
  // non protected route
  app.get('/',(req,res,next)=>{
    var data = {
      title:'Title',
      otherData:[]
    };
    data.csrfToken = req.csrfToken();
    res.render('demo',data);
  });

  // session protected route
  app.get('/demo-protected',isSessionProtected,(req,res,next)=>{
    // your code here

  });

  api_routes(app);
}
module.exports = routes;

/*
ALT way of including partials
res.locals = data;
res.render('portal-entry',{partials:{message: 'header',sideBar:'sideBar'}});
*/
