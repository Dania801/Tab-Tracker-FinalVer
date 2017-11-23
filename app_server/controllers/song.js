var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};

var renderSongTab = function(req, res, body){
  res.render('tab1' , {
    request: req.params.songid,
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      login: 'Login'
    },
    songInfo: body
  }) ;
}

module.exports.songTab = function(req , res){
  var requestOptions, path ;
  path = '/api/songs/' + req.params.songid;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  };

  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderSongTab(req, res, body);
    }
  })
};


var renderExtededSongTab = function(req, res, body){
  res.render('tab2' , {
    request: req.params.songid,
    userid: req.params.userid,
    url: '/home/' + req.params.userid,
    title: 'Song Tabs',
    nav:{
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songInfo: body
  }) ;
}

module.exports.extendedSongTab = function(req , res){
  var requestOptions, path;
  path = '/api/songs/' + req.params.songid ;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  }
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderExtededSongTab(req, res, body);
    }
  })
};


var renderEditSong = function(req, res, body){
  res.render('edit' , {
    url: req.originalUrl,
    userid: req.params.userid,
    title: 'Edit Song',
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      logout: 'Log out'
    },
    songInfo: body
  }) ;
};

module.exports.editSong = function(req, res){
  var requestOptions, path;
  path = '/api/songs/' + req.params.songid;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {},
    qs: {}
  }
  request(requestOptions, function(err, response, body){
    if(err){

    }else{
      renderEditSong(req, res, body);
    }
  })
};

module.exports.doEditSong = function(req, res){
  console.log('inside do edit song');
  var requestOptions, path, data;
  var oldId = req.params.songid ;
  var newTitle = req.body.title ;
  var newArtist = req.body.artist ;
  var newGenre = req.body.genre ;
  var newYear = req.body.year ;
  var newAlbum = req.body.album ;
  var newTab = req.body.tab ;
  var newLyrics = req.body.lyrics ;
  var newYoutubeID = req.body.youtubeID ;
  var newCover = req.body.cover? '../images/'+ req.body.cover : req.body.oldcover ;
  data = {
    _id: oldId,
    title: newTitle,
    artist: newArtist,
    album: newAlbum,
    genre: newGenre,
    year: newYear,
    tab: newTab,
    lyrics: newLyrics,
    youtubeID: newYoutubeID,
    cover: newCover
  };

  path = '/api/songs/'+ oldId ;
  requestOptions = {
    url: apiOptions.server + path,
    method: 'PUT',
    json: data
  } ;

  console.log(requestOptions);
  request(requestOptions, function(err, response, body){
    console.log('editting a song');
    if(response.statusCode === 201){
      res.redirect('/home/'+req.params.userid+'/song/'+ oldId);
    }else{
      console.log('ERROR IN POSTING !!');
    }
  });

}
