var mongoose = require( 'mongoose' );
var User = mongoose.model('User');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
}

// Reading the bookmarked songs to a specific user.
module.exports.bookmarkList = function(req , res){
  if(req.params && req.params.userid){
    User
      .findOne({'allUsers._id': req.params.userid}, (err, user) => {
        for(var i = 0 ; i < user.allUsers.length; i++){
          var theBookmark ;
          if (user.allUsers[i]._id == req.params.userid){
            theBookmark = user.allUsers[i].bookmarkedSongs;
            break;
          }
        }
        sendJsonResponse(res, 200, theBookmark);
      });
  }else{
    sendJsonResponse(res, 404, {"message": "No userid is found!"});
  }
};


var insertNewSong = function(req, res){
  console.log(req.body.songid);
  var newId = new mongoose.mongo.ObjectId(''+req.body.songid+'');
  console.log('inside insertNewSong');
  User
    .update({"allUsers._id": req.params.userid},{$push: { 'allUsers.$.bookmarkedSongs' : {
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      year: req.body.year,
      genre: req.body.genre,
      lyrics: req.body.lyrics,
      tab: req.body.tab,
      cover: req.body.cover,
      _id: newId
    }}},(err, song) => {
      if (err){
        sendJsonResponse(res, 404, err);
        return;
      }else{
        sendJsonResponse(res, 201, song);
      }
    })
    console.log('Doesnt exists') ;
};


var checkAndAddSong = function(req, res){
  console.log('inside checkAndAddSong');
  if (req.params && req.params.userid){
    // finding the list of a specific user
    User
      .findOne({'allUsers._id': req.params.userid}, (err, user) => {
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else{
          for(var i = 0 ; i < user.allUsers.length; i++){
            var theList ;
            if (user.allUsers[i]._id == req.params.userid){
              theList = user.allUsers[i].bookmarkedSongs;
              break;
            }
          }

          if(theList.length > 4){
            User
              .update({"allUsers._id": req.params.userid},{$pop: { 'allUsers.$.bookmarkedSongs' : -1 }},(err, song) => {
                if(err){
                  //sendJsonResponse(res, 404, err);
                  return;
                }else{
                  console.log('The already existing song is deleted')
                }
              });
          }

          // Finding a song in the recently viewed list
          for(var i = 0 ; i < theList.length; i++){
            console.log(i) ;
            console.log(theList[i]);
            var theSong ;
            if(theList[i]._id == req.body.songid){
              theSong = theList[i] ;
              break ;
            }
          }
          // inserting a new song
          if(!theSong){
            console.log("The song doesnt exist in the list , we're adding it")
            insertNewSong(req, res);
          }else {
            //Deleting the song from a list
            console.log("The sont already exists in the list, we're deleting it to add it freshly ");
            User
              .update({"allUsers._id": req.params.userid},{$pull: { 'allUsers.$.bookmarkedSongs' : {_id: req.body.songid} }},(err, song) => {
                if(err){
                  sendJsonResponse(res, 404, err);
                  return;
                }else{
                  console.log('The already existing song is deleted')
                }
              });
            // Adding the song after deleting it .
            insertNewSong(req, res);
          }
        }
      });
  }else {
    sendJsonResponse(res, 404, {"message": "No userid is found!"});
  }
}


// Adding new Bookmarked song to a specific user
module.exports.createBookmark = function(req , res){
  checkAndAddSong(req, res);
};

module.exports.updateBookmark = function(req , res){

};

module.exports.deleteBookmark = function(req , res){
  if(req.params && req.params.userid && req.params.bookmarkid){
    User
      .findById(req.params.userid)
      .select('bookmarkedSongs')
      .exec(function(err, user){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }else if(!user){
          sendJsonResponse(res, 404, {"message": "No user is found!"});
          return;
        }else{
          user.bookmarkedSongs.id(req.params.bookmarkid).remove();
          user.save(function(err){
            if(err){
              sendJsonResponse(res, 404, err);
            }else{
              sendJsonResponse(res, 204, null);
            }
          })
        }
      })
  }else{
    if(!req.params.userid)
      sendJsonResponse(res, 404, {"message": "no userid is found!"});
    else
      sendJsonResponse(res, 404 , {"message": "no bookmarkid is found"});
  }
};
