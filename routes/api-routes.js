const controller = require('../controller/index.js');
// const usersC = controller.users;
const helpers = require('../helpers/commonfunctions.js');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const speakeasy = require('speakeasy');
const APIisSessionProtected  = require('../helpers/apiProtector.js');

var routes = (app) => {
  app.get('/api', (req, res, next) => {
    helpers.resSuccess(res, {status: 'this works'});
  });

  // permission based restricted api calls
  app.post('/api/user/edit',APIisSessionProtected,(req,res,next)=>{
    helpers.resSuccess(res, {status: 'this works'});
  });

}

module.exports = routes;
// using express to create download https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
















/*
for time being you can use the online qr code generator with `otpauth_url` of our response here
var QRCode = require('qrcode');

QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
console.log(image_data); // A data URI for the QR code image
});
*/
