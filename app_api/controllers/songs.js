var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJsonResponse = function(res , status , content){
  res.status(status);
  res.json(content);
};

// Read all songs stored in DB
module.exports.SongList = function(req , res){
  User
    .find()
    .select('allSongs')
    .exec(function(err, songs){
      if(err){
          sendJsonResponse(res, 404, err);
          return;
      }
      else if(!songs){
        sendJsonResponse(res, 404, {"message": "No songs found!"});
        return;
      }
      else
        sendJsonResponse(res, 200, songs);
    })
};

// Read all songs of a user from the DB
module.exports.getSong = function(req , res){
  if(req.params && req.params.songid){
    User
      .find({'allSongs._id': req.params.songid},{'allSongs': true}, (err, song) => {
        if (err){
          sendJsonResponse(res, 404, err);
          return;
        }else {
          for(var i = 0 ; i < song[0].allSongs.length; i++){
            var theSong ;
            if(song[0].allSongs[i]._id == req.params.songid){
              theSong = song[0].allSongs[i];
              break;
            }
          }
          sendJsonResponse(res, 200, theSong);
        }
      });
  }else{
      sendJsonResponse(res, 404, {"message": "no songid is found!"});
  }
};

// Add new song to the DB
module.exports.createSong = function(req , res){
  User
    .update({_id: '5a1588c4a33e8a074e3bd012'}, {$push : {allSongs: {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      tab: req.body.tab,
      cover: req.body.cover,
      youtubeID: req.body.youtubeID
    }
  }}, {upsert: true} , (err, song) => {
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    }
    else {
      sendJsonResponse(res, 201, song);
    }
  })
};

// Update a specific song in the DB
module.exports.updateSong = function(req , res){
  console.log('Inside update Song function');
User
  .update({'allSongs._id': req.params.songid}, {'$set': {
    'allSongs.$.title': req.body.title,
    'allSongs.$.genre': req.body.genre,
    'allSongs.$.album': req.body.album,
    'allSongs.$.artist': req.body.artist,
    'allSongs.$.year': req.body.year,
    'allSongs.$.lyrics': req.body.lyrics,
    'allSongs.$.tab': req.body.tab,
    'allSongs.$.cover': req.body.cover
  }}, function(err, song){
    if(err){
      sendJsonResponse(res, 404, err);
      return;
    }
    else {
      sendJsonResponse(res, 201, song);
    }
  })
};

// Remove a song from the DB
module.exports.deleteSong = function(req , res){
  if(req.params && req.params.songid){
    Song
      .findByIdAndRemove(req.params.songid)
      .exec(function(err, song){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!song){
          sendJsonResponse(res, 404, {"message": "No song is found!"});
          return;
        }else{
          sendJsonResponse(res, 204, null);
        }
      })
  }else{
    sendJsonResponse(res, 404, {"message":"No songid is found!"});
  }
};
