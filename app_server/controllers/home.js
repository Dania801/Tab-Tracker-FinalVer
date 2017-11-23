var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};


var renderSongList = function(req, res, body){
  res.render('home1' , {
    title: 'Welcome to Tab Tracker',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    cover: {
      title: 'Tab Tracker',
      desc: 'Keep Track of guitar tabs !'
    },
    featured: {
      title: 'FEATURED SONGS',
      songs: body[0].allSongs
    }
  });
};

module.exports.songList = function(req , res){
  var requestOptions, path;
  path = '/api/songs';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions,function(err, response, body){
    if(err){

    }else{
      renderSongList(req, res, body);
    }
  })
};



var renderExtededSongList = function(req, res, body){
  console.log(req.params.userid);
  //console.log(body[0].allUsers)
  var theUser;
  for(var i = 0 ; i < body[0].allUsers.length; i++){
    if(body[0].allUsers[i]._id == req.params.userid){
      theUser = body[0].allUsers[i] ;
      break;
    }
  }
  if(theUser){
    //console.log(body[0].allSongs);
    res.render('home2' , {
      request: req.params.userid ,
      title: 'Home',
      username: theUser.username,
      userid: theUser._id ,
      caption: 'Here you get a chance to explore the universe of music. Enjoy the available tabs, and add more songs to play and give others an apportunity to learn!',
      nav: {
        home: 'HOME',
        about: 'ABOUT',
        logout: 'Log out'
      },
      url: request.originalUrl,
      url_recently: request.originalUrl+ '/recently',
      songs: body[0].allSongs,
      recentlyViewed: theUser.recentlyViewed,
      bookmarkedSongs: theUser.bookmarkedSongs
    }) ;
  }else {
    console.log('couldnt find a user');
  }

};



module.exports.extendedSongList = function(req , res){
  var requestOptions1, path1 ;
  path1 = '/api/all';
  requestOptions1 = {
    url: apiOptions.server + path1,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions1, function(err, response, body){
    if(err){

    }else{
      renderExtededSongList(req, res, body);
    }
  })
};

var renderAddSong = function(req, res, body){
  res.render('Add' , {
    title: 'Add a new song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    url: '/add/'+ req.params.userid
  }) ;
};

module.exports.addSong = function(req, res){
  var requestOptions, path ;
  path = '/api/songs';
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderAddSong(req, res, body);
    }
  });
};

module.exports.doAddSong = function(req, res){
  console.log('doAddSong is invoked!');
  var requestOptions, path, data;
  path = '/api/songs';
  var newCover = req.body.cover? '../images/'+ req.body.cover : '../images/unknown.jpg' ;
  data = {
    title : req.body.title ,
    artist : req.body.artist ,
    album : req.body.album ,
    year : req.body.year ,
    genre : req.body.genre ,
    lyrics : req.body.lyrics ,
    tab : req.body.tab ,
    cover : newCover,
    youtubeID : req.body.youtubeID
  };
  console.log(data);
  requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: data
  };
  request(requestOptions, function(err, response, body){
    console.log('sending a post request');
    if(response.statusCode === 201){
      console.log(req.params.userid);
      res.redirect('/home/'+req.params.userid);
    }
    else{
      console.log('ERROR IN POSTING !!!');
    }
  });
};

module.exports.addSometing = function(req, res){
  console.log('addSometing is invoked!');
  var input = req.body.something ;
  if(input == 'bookmark'){
    console.log('bookmark is invoked') ;
    doAddBookmark(req, res) ;
  } else {
    console.log('recently is invoked') ;
    doAddRecentlyViewed(req, res);
  }
}

var doAddBookmark = function(req, res){
  console.log('doAddBookmark is invoked!');
  var requestOptions, path, data;
  path = '/api/user/' + req.body.userid + '/bookmark';
  data = {
    songid : req.body.songid ,
    title : req.body.title ,
    artist : req.body.artist ,
    year : req.body.year ,
    genre : req.body.genre ,
    album : req.body.album ,
    lyrics : req.body.lyrics ,
    tab : req.body.tab ,
    cover : req.body.cover ,
    youtubeID : req.body.youtubeID
  };
  console.log(data) ;
  requestOptions = {
    url: apiOptions.server + path ,
    method: 'POST' ,
    json: data
  };
  request(requestOptions, function(err, response, body){
    console.log('Posting new bookmark');
    if(response.statusCode === 201){
      res.redirect('/home/'+ req.body.userid);
    }else{
      console.log('ERROR IN POSTING !!');
    }
  });
};

var doAddRecentlyViewed = function(req, res){
  console.log('doAddRecentlyViewed is invoked!');
  var requestOptions, path, data;
  console.log(req.body.songid);
  path = '/api/user/' + req.body.userid + '/recently';
  data = {
    songid : req.body.songid ,
    title : req.body.title ,
    artist : req.body.artist ,
    year : req.body.year ,
    genre : req.body.genre ,
    album : req.body.album ,
    lyrics : req.body.lyrics ,
    tab : req.body.tab ,
    cover : req.body.cover ,
    youtubeID : req.body.youtubeID
  };
  console.log(data) ;
  requestOptions = {
    url: apiOptions.server + path ,
    method: 'POST' ,
    json: data
  };
  console.log(requestOptions);
  request(requestOptions, function(err, response, body){
    console.log('Posting new recently');
    if(response.statusCode === 201){
      console.log(response.statusCode)
      res.redirect('/home/'+req.body.userid+'/song/' + data.songid);
    }else{
      console.log('ERROR IN POSTING !!');
    }
  });
};
