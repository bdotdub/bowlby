var Bowlby = function() {
  var aimUrl = 'http://api.screenname.aol.com';
  var oscarUrl = 'http://api.oscar.aol.com';
  
  var devId = 'ny1RKZa7o4-gcjMn';
  var key = 'ny1AhLQiXBtsiWdn';
  
  var getAuth = function() {
    // URL and data
    var getTokenUrl = aimUrl + '/auth/getToken';
    var data = {
      devId:  devId,
      f:      'json',
      c:      '?'
    };
    
    // Make the json call
    $.getJSON(constructUrlWithData(getTokenUrl, data), function(result) {
      // If statusCode == 200, we are logged in
      if (result.response.statusCode == 200) {
        loggedIn(result.response.data.token.a)
      }
      // Else, we need to redirect
      else if (result.response.statusCode == 401) {
        createIframeAndWatch(result.response.data.redirectURL)
      }
    });    
  };
  
  var loggedIn = function(a) {
    var presenceUrl = oscarUrl + '/presence/get';
    var data = {
      k:    key,
      bl:   true,
      f:    'json',
      a:    a,
      c:    '?'
    };
    
    $.getJSON(constructUrlWithData(presenceUrl, data), function(result) {
      console.log(result);
    });
  }
  
  var createIframeAndWatch = function(loginUrl) {
    var data = {
      devId: devId,
      f: 'json'
    };
    
    // Create the URL
    loginUrl = constructUrlWithData(loginUrl, data)
    
    // Create the IFRAME
    var iframe = document.createElement('iframe');
    iframe.id = "AuthIframe";
    iframe.src = loginUrl;
    iframe.width = 550;
    iframe.height = 400;
    
    // Start URL polling
    checkUrl();
    
    // Add the iframe
    $('#bowlby-study').append(iframe);
  }
  
  var checkUrl = function() {
    if (document.location.href.indexOf("#AUTHDONE") != -1) {
      // Remove the iframe and getAuth again
      $('#AuthIframe').remove();
      getAuth();
    }
    else {
      // Reset the timeout
      clearTimeout(timeout);
      var timeout = setTimeout(checkUrl, 500)
    }
  }
  
  var constructUrlWithData = function(url, data) {
    // Create new array
    var kv = new Array();
    
    // Traverse data and create query strings
    for (var key in data)
      kv.push(key + "=" + data[key]);
      
    // Join params and URL
    return url + "?" + kv.join('&');
  }
  
  getAuth();
};

