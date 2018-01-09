const helpers = require('../helpers/commonfunctions.js');
const controller = require('../controller/index.js');
var sessionProtected = (req,res,next)=>{
  if(process.env.NODE_ENV == 'TEST'){
    req.session.user = {
      user_id: 1,
      fName: 'Harshwardhan',
      verified: false,
      employer_id: 1,
      last_activity: '2017-09-05T05:20:48.895Z',
      registered_on: '2017-09-05T05:20:48.895Z',
      permissions: 0,
      // availablePermissions: [Object]
    }
  }

  if(!req.session.user){
    var err = {message:'session is not valid ! Please relogin!'};
    helpers.resError(res, err, true, req);
  }
  else{
    // determine permission flags
    req.session.user.availablePermissions = helpers.createPermissionFlags(req.session.user.permissions);
    // hit the DB and update the last activity of the user
    controller.users.updateLastActivity(req.session.user.user_id);
    next();
  }
};

module.exports = sessionProtected;
