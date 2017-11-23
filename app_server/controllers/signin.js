var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};

var renderSigninAccount = function(req, res){
  res.render('login' , {
    title: 'Login',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    }
  }) ;
}

module.exports.signinAccount = function(req , res){
  renderSigninAccount(req, res);
};


var renderRegisterAccount = function(req, res){
  res.render('signup' , {
    title: 'Register',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    },
    url: req.originalUrl
  }) ;
}

module.exports.registerAccountPage = function(req , res){
  console.log('registerAccountPage is activated');
  renderRegisterAccount(req, res);
};

module.exports.registerUser = function(req, res){
  console.log('still in the server .. moving to the api') ;
  var requestOptions, path, data ;
  path = '/api/user' ;
  data = {
    username : req.body.username ,
    email : req.body.email ,
    password : req.body.password
  };
  requestOptions = {
    url: apiOptions.server + path ,
    method: 'POST',
    json: data
  };

  console.log(data) ;
  console.log(requestOptions) ;

  request(requestOptions, function(err, response, body){
    console.log('INSIDE request') ;
    console.log(response.statusCode) ;
    if(response.statusCode === 201){
      res.redirect('/home/'+body._id);
    }else{
      console.log('ERROR in POSTING!') ;
    }
  })
};

module.exports.doSigninAccount = function(req, res){
  console.log('inside doSigninAccount!');
  var requestOptions, path, data ;
  path = '/api/login' ;
  data = {
    email : req.body.email,
    password : req.body.password
  };
  requestOptions = {
    url: apiOptions.server + path ,
    method: 'POST',
    json: data
  };

  console.log(data) ;
  console.log(requestOptions) ;

  request(requestOptions, function(err, response, body){
    console.log('INSIDE request') ;
    console.log(response.statusCode) ;
    console.log(body._id);
    if(response.statusCode === 201){
      res.redirect('/home/'+body._id);
    }else{
      console.log('ERROR in POSTING!') ;
    }
  })
}
