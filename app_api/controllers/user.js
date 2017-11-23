var mongoose = require( 'mongoose' );
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
var Client = mongoose.model('Client');
var jwt = require('jsonwebtoken');


var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

// generate jwt for every live session of users
var generateJwt = function() {
  console.log('inside jwt function!');
	 var expiry = new Date();
	 expiry.setDate(expiry.getDate() + 7);

	  return jwt.sign({
		_id: this._id,
		email: this.email,
		name: this.name,
		exp: parseInt(expiry.getTime() / 1000),
	  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};



module.exports.getAll = function(req, res){
  console.log('getAll is called!!');
  User.find({},(err, all) => {
    if(err){
      sendJsonResponse(res, 404, err);
    }else{
      sendJsonResponse(res, 200, all);
    }
  });
}

// Reading a user from the DB
module.exports.getUserProfile = function(req, res, next){

  console.log('Im inside getUserProfile function !!');
  passport.authenticate('local-login', function(err, user, info) {
    if (err) {
      console.log('Error1');
      return next(err);
    }

    if (!user) {
      console.log('Error2');
      return res.redirect('/signin');
    }
    console.log(user);
    console.log('success!');
    req.logIn(user, function(err) {
      console.log('Inside the last fuckin function!');
      if (err) {
        console.log('Error3');
        return next(err);
      }
      console.log('Here im!');
      res.status(201);
      res.json(user);
      return res.redirect('/' );
    });
  })(req, res, next);
};

module.exports.loginUser = function(req, res){/*
  passport.authenticate('local', function(err, user, info){
    var token;
    // If Passport throws/catches an error
    if (err) {
      sendJsonResponse(res, 404, err);
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
      sendJsonResponse(res, 200, {"token": token}) ;
    } else {
      // If user is not found
      sendJsonResponse(res, 401, info);
    }
  })(req, res);*/

};


// Add a new user to the DB
module.exports.registerUser = function(req , res, next){
  console.log('Im inside registrerUser function');

  passport.authenticate('local-signup', function(err, user, info) {
    if (err) {
      console.log('Error1');
      return next(err);
    }

    if (!user) {
      console.log('Error2');
      return res.redirect('/signin');
    }
    console.log(info);
    console.log('success!');
    req.logIn(user, function(err) {
      console.log('Inside the last fuckin function!');
      if (err) {
        console.log('Error3');
        console.log(err);
        return next(err);
      }
      console.log('Here im!');
      res.status(201);
      res.json(user);
      return res.redirect('/' );
    });
  })(req, res, next);
};




module.exports.updateUser = function(req , res){
  if(req.params && req.params.userid){
    User
      .findById(req.params.userid)
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "Couldn't find the user!"});
          return;
        }else{
          user.user.username = req.body.username ? req.body.username : user.user.username;
          user.user.password = req.body.password ? req.body.password : user.user.password;
          user.user.email = req.body.email ? req.body.email : user.user.email;
          user.save(function(err, user){
            if(err){
              sendJsonResponse(res, 404, err);
            }else{
              sendJsonResponse(res, 200, user);
            }
          });
        }
      });
  }else{
    sendJsonResponse(res, 404, {"message":"No userid found!"});
  }
};

module.exports.deleteUser = function(req , res){

};
