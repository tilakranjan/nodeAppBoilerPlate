const request = require("request");
const nodemailer = require('nodemailer');
var redis = require("redis"),
redisClient = redis.createClient();
var fs = require("fs");
const config = require('../config.js');
const theFunctions = {};
const CryptoJS = require('crypto-js');

let transporter = nodemailer.createTransport(config.mailSettings);

// to help with response consistency for error
theFunctions.resError = (res,e,writeToLog,input)=>{
  res.json({success:false, error:e.message||e});

  if(writeToLog){
    // console.log('failed with following data packet attempt');
    // console.log(input);
    console.log(e.message);
    // a function to log the attempt to the database
  }
}

// to help with response consistency for success
theFunctions.resSuccess = (res,data)=>{
  res.json({success:true, result:data});
}

theFunctions.makeHeadless = (token)=>{
  token = token.split('.');
  token = token[1] + '.' + token[2]; // removing the 1st part of the token to make it headless
  return token;
}

theFunctions.sendEmail=(body,theMail)=>{
  let mailOptions = {
      from: '"From Name" <'+config.mailSettings.auth.user+'>', // sender address
      to  : theMail.email, // list of receivers
      subject: theMail.subject, // Subject line
      html: body // html body
  };
  transporter.sendMail(mailOptions, (error, info) => {
       if (error) {
           console.log(error.message);
       }
   });
}

module.exports=theFunctions;
