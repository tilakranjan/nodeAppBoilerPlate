// process.env.NODE_ENV = "TEST";
const path    = require('path');
const thePath = path.join(__dirname, 'public');
var productionEnv = {
  db: {
    user: 'postgres',
    database: 'dbname',
    password: '--yourpassword--',
    host: '--yourhostIP--',
    port: 5432,
    max: 60,                        // max number of clients in the pool
    idleTimeoutMillis: 5000
  },
  smsToken:'--',
  shortSession: 20,                 // when does the expiration of login happens
  mainSession: 20,                  // when does the expiration of token generated after 2F verfication happens
  jwtSecret: '--',     // this is to generate token for the 1st step i.e just after login
  jwtSessionSecret: '--!',
  jwtHeader: '--.', // => Do Not change this unless you know what you are doing: ALGO STUFF
  port: 4000,
  url: '--.com',
  smsText: 'Your verification code is ',
  sessionSecretCode:'--',
  secureSessionCookie:false, //Note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
  mailSettings:{
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '--', // generated ethereal user
      pass: '--'  // generated ethereal password
    }
  },
  uploadPath:thePath+'/uploads/',
  fileDeletionTime:24, // in hours
};

var developmentEnv = {
  db: {
    user: 'postgres',
    database: 'dbname',
    password: '--',
    host: 'localhost',
    port: 5432,
    max: 60,                      // max number of clients in the pool
    idleTimeoutMillis: 5000
  },
  smsToken:'--',
  shortSession: 20,               // when does the expiration of login happens
  mainSession: 20,                // when does the expiration of token generated after 2F verfication happens
  jwtSecret: '--',     // this is to generate token for the 1st step i.e just after login
  jwtSessionSecret: '--!',
  jwtHeader: '--.', // => Do Not change this unless you know what you are doing: ALGO STUFF
  port: 3000,
  url: 'localhost:3000',
  smsText: 'Your verification code is ',
  sessionSecretCode:'--',
  secureSessionCookie:false, //Note be careful when setting this to true, as compliant clients will not send the cookie back to the server in the future if the browser does not have an HTTPS connection.
  mailSettings:{
    service: 'gmail',
    tls: {
      rejectUnauthorized:false,
    },
    auth: {
      user: '--',
      pass: '--'
    }
  },
  uploadPath:thePath+'/uploads/',
  fileDeletionTime:24, // in hours
};

const envVars=(process.env.NODE_ENV == 'production'? productionEnv: developmentEnv);

module.exports = envVars;
