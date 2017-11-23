$(document).ready(function(){
  /*var cache = new LastFMCache();

  var lastfm = new LastFM({
  apiKey : 'cd5c7aaa60ec6f7d08254de19367b251',
  apiSecret : 'e36d13d177b19c4f2cab6010c02079d7',
  cache : cache
  });

  lastfm.artist.getInfo({artist: 'Celine Dion'}, {success: function(data){
    youtube.innerHTML = data.bio ;
    alert(data);

      }, error: function(code, message){

      youtube.innerHTML = message ;
   }});*/

   $.ajax({
    type : 'POST',
    url : 'http://ws.audioscrobbler.com/2.0/',
    data : 'method=track.getinfo&' +
           'api_key=cd5c7aaa60ec6f7d08254de19367b251&' +
           'artist=cher&'+
           'track=believe&'+
           'format=json',
    dataType : 'jsonp',
    success : function(data) {
      youtube.innerHTML = "hello";
      youtube.innerHTML = data.track.album.url ;
    },
    error : function(code, message){
        alert(message);
    }
});
})
