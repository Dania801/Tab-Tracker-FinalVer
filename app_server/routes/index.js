var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/home.js') ;
var ctrlSong = require('../controllers/song.js') ;
var ctrlSignin = require('../controllers/signin.js') ;
var ctrlAbout = require('../controllers/about.js') ;


/* Home pages. */
router.get('/user/:userid/about' , ctrlAbout.extendedAboutPage) ;
router.get('/about' , ctrlAbout.aboutPage) ;

router.get('/home/:userid/song/:songid' , ctrlSong.extendedSongTab) ;
router.get('/home/:userid/song/:songid/edit' , ctrlSong.editSong) ;
router.post('/home/:userid/song/:songid/edit', ctrlSong.doEditSong) ;

router.get('/' , ctrlHome.songList) ;
router.post('/home/:userid' , ctrlHome.addSometing) ;
router.get('/home/:userid' , ctrlHome.extendedSongList) ;

router.get('/add/:userid' , ctrlHome.addSong) ;
router.post('/add/:userid' , ctrlHome.doAddSong) ;
router.get('/song/:songid' , ctrlSong.songTab) ;

router.get('/reg', ctrlSignin.registerAccountPage) ;
router.get('/signin' , ctrlSignin.signinAccount) ;
router.post('/signin', ctrlSignin.doSigninAccount) ;
router.get('/reg' , ctrlSignin.registerAccountPage) ;
router.post('/signin/reg', ctrlSignin.registerUser) ;




module.exports = router;
