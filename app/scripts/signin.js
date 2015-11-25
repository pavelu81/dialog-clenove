(function(document) {
  'use strict';
  var allowedDomain = 'dsdialog.org';
  var app = document.querySelector('#app');
  app.addEventListener('dom-change', function() {
	var gsigner = document.querySelector('google-signin');
	gsigner.addEventListener('google-signin-success',handlerSigninSuccess);
	gsigner.addEventListener('google-signed-out',handlerSignedOut);
  });

  var handlerSignedOut = function(){
	app.signed = false;
  };
  var handlerSigninSuccess = function(evt){
	console.log('Přihlášeno');
	var user = window.gapi.auth2.getAuthInstance().currentUser.get();
	var domain = user.getHostedDomain();

	if (domain!==allowedDomain){
		user.disconnect();
		evt.target.signOut();
		//alert('Je povoleno přihlášení pouze uživatelům z domény "dsdialog.org"!');
	}

	app.userProfile = user.getBasicProfile();
	//var email = userProfile.getEmail();
	//var name = userProfile.getName();

	app.signed = true;
  };
  
  
})(document);
