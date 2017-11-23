var request = require( 'request' );
var apiOptions = {
  server: 'http://localhost:3000'
};


var renderAboutPage = function(req, res){
  res.render('about1' , {
    title : 'About',
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    },
    cover: {
      title: 'Tab Tracker',
      desc: 'Tab Tracker is a music service that helps to organize songs you love, and to keep track of guitar tabs !'
    },
    feature1: {
      title: 'Organize your songs!',
      desc: 'Your Tab Tracker profile is like your musical calling card. When someone asks “What music are you into?”, your profile has all the answers. It’s everything you really listen to.'
    },
    feature2: {
      title: 'Learn how to play your favourite songs!',
      desc: "Here you find your favourite song's guitar tabs. If you're beginner you can learn easily to play guitar with these useful tabs, you'll eventually succeed in playing your favorite songs!"
    },
    feature3: {
      title: 'Be an active member!',
      desc: 'Enrich the content of the website and help others to learn more guitar tabs by adding songs you figured out how to play them. Add, Edit, Bookmark and manage your own songs! '
    }
  }) ;
};

module.exports.aboutPage = function(req , res){
  renderAboutPage(res, res);
};


var renderExtededAboutPage = function(req, res){
  res.render('about2' , {
    title: 'About',
    userid: req.params.userid,
    nav: {
      home: 'HOME',
      about: 'ABOUT'
    },
    cover: {
      title: 'Tab Tracker',
      desc: 'Tab Tracker is a music service that helps to organize songs you love, and to keep track of guitar tabs !'
    },
    feature1: {
      title: 'Organize your songs!',
      desc: 'Your Tab Tracker profile is like your musical calling card. When someone asks “What music are you into?”, your profile has all the answers. It’s everything you really listen to.'
    },
    feature2: {
      title: 'Learn how to play your favourite songs!',
      desc: "Here you find your favourite song's guitar tabs. If you're beginner you can learn easily to play guitar with these useful tabs, you'll eventually succeed in playing your favorite songs!"
    },
    feature3: {
      title: 'Be an active member!',
      desc: 'Enrich the content of the website and help others to learn more guitar tabs by adding songs you figured out how to play them. Add, Edit, Bookmark and manage your own songs! '
    }
  }) ;
};

module.exports.extendedAboutPage = function(req , res){
  console.log('hello from about');
  renderExtededAboutPage(req, res);
};
