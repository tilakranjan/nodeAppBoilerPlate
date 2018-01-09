const helpers = require('../helpers/commonfunctions.js');
var sessionProtected = (req,res,next)=>{
  // req.session.user = { user_id: 1,fName: 'Harshwardhan',verified: false,permissions: '1,4,5,1A' };
  if(!req.session.user){
    res.redirect('../?error=Authentication Failed, please try again!');
  }
  else{
    // determine permission flags
    req.session.user.availablePermissions = helpers.createPermissionFlags(req.session.user.permissions);
    req.session.user.showHive = (req.session.user.authorizations!=null && req.session.user.authorizations!=false) || req.session.user.availablePermissions.isAdmin;
    next();
  }
}
module.exports = sessionProtected;
