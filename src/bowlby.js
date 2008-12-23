var Bowlby = function() {
  var aimUrl = 'http://api.screenname.aol.com';
  
  var getAuth = function() {
    // First getToken
    var getTokenUrl = aimUrl + '/auth/getToken?';
    getTokenUrl += "devId=ny1RKZa7o4-gcjMn&";
    getTokenUrl += "f=json&";
    getTokenUrl += "c=?";
    
    $.getJSON(getTokenUrl, function(result) {
      var iframe = document.createElement('iframe');
      iframe.src = result.response.data.redirectURL;
      
      iframe.width = 500;
      iframe.height = 500;
      
      $('#bowlby-study').append(iframe);
      
      console.log(result.response.data.redirectURL)
    });    
  };
  
  getAuth();
};
