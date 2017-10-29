checkLoad();

function checkLoad() {
  if (readCookie('_authentification') != null) {
    $('.loginAuth a').text('LOGOUT');
    $('.loginAuth').click(function() {
      var delete_cookie = function(name) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      };
      delete_cookie('_authentification');
      location.reload();
    });
  } else {
    $('.loginAuth, .loginAuth--userNotDetected');
    if (getPostParams('code')) {
      var now = new Date();
      now.setTime(now.getTime() + 24 * 3600 * 1000);
      document.cookie = "_authentification=" + getPostParams('code') + "; expires=" + now.toUTCString() + "; path=/";
    } else {
      $('.loginAuth a').text('LOGIN');
      $('.loginAuth').click(function() {
        Authentificate();
      });
    }

  }
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function Authentificate() {
  var lock = new Auth0Lock('M9BCvF0zmC1cThL4JBygsD78hJWUVHej', 'gutorov.auth0.com', {
    auth: {
      redirectUrl: 'https://permitted-co.netlify.com/',
      responseType: 'code',
      params: {
        scope: 'openid email'
      },
    }
  });
  lock.show();
}

function getPostParams(parameterName) {
  var result = null,
    parameterName = 'code',
    tmp = [];
  var items = location.search.substr(1).split("&");
  if (items.length > 0) {
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  } else {
    return false;
  }
}
