var mongoose = require( 'mongoose' );
var crypto = require('crypto') ;
var jwt = require('jsonwebtoken');

var songSchema = new mongoose.Schema({
  title: {type: String , required: true},
  artist: {type: String, required: true},
  album: {type: String, required: false, "default": 'Unspecified album'},
  year: {type: String, require: false, "default": '-'},
  genre: {type: String, require: false, "default": 'Unspecified genre'},
  youtubeID: {type: String, require: false, "default": '-'},
  lyrics: {type: String, require: true},
  tab: {type: String, require: true},
  cover: {type: String, require: false, "default": '../images/unknown.jpg'}
});

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: mongoose.Schema.Types.Mixed, required: true}
});

var accountSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true },
  hash: String,
  salt: String,
  bookmarkedSongs : {type: [songSchema], require: false, "default": []} ,
  recentlyViewed : {type: [songSchema], require: false, "default": []}
});

var allUsersSchema = new mongoose.Schema({
  allSongs: {type: [songSchema], required: false, "default":[]},
  allUsers: {type: [accountSchema], required: false, "default":[]}
});

// Setting the password after hashing it
accountSchema.methods.setPassword = function(password){
  console.log('Inside set password');
  console.log('Password = '+ password);
	  this.salt = crypto.randomBytes(16).toString('hex');
	  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
};

// return boolean depending on validation results
accountSchema.methods.validPassword = function(password) {
	  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
	  return this.hash === hash;
};

// generate jwt for every live session of users
accountSchema.methods.generateJwt = function() {
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


mongoose.model('Client', accountSchema, 'clients');
mongoose.model('User', allUsersSchema, 'users');
