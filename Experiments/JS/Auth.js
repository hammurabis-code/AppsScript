var AuthScope = {}
AuthScope.clientId = "829710692515-un86n38lssrt21b3qq7tg5mkq2qhq1lf.apps.googleusercontent.com";
AuthScope.apiKey = "AIzaSyBdJUFTj4tuQysOaiFwlo73PWhK59f8n3A";
AuthScope.apiScopes = "https://www.googleapis.com/auth/forms";
AuthScope.callBack = "?callback=receive";
AuthScope.ScriptObjects = [];
AuthScope.ScriptObjects.scriptId = "AKfycbxz0vGRirsyWMKfn1N9Wy1zcXQFHCwmz0OxPEVtz64g1860jPM";
AuthScope.ScriptObjects.ScriptUrl = "https://script.google.com/a/macros/advantedgetooling.com/s/" + AuthScope.ScriptObjects.scriptId + "/exec";
//$(function () {
//    gapi.client.setApiKey(apiKey);
//    window.setTimeout(checkAuth, 1);
//	//$( "#btnSubmit" ).on( "click", function() {
//	//  console.log( 'Submit Clicked.' );
//	//});
//});

function gapiLoaded() {
    gapi.load('client', function () {
        console.log('gapi.client loaded.');
    });
    gapi.client.setApiKey(AuthScope.apiKey);
    window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    gapi.auth.authorize({ client_id: AuthScope.clientId, scope: AuthScope.apiScopes, immediate: true }, handleAuthResult);
}

function handleAuthClick() {
    checkAuth();
}

function handleAuthResult(authResult) {
    //var authorizeButton = document.getElementById('authorize-button');
    //var formButton = document.getElementById('btnSubmit');
    if (authResult && !authResult.error) {
    	$( ".AS_Initial" ).show();
    	$('#btnSubmit').click(testClick);
    	//formButton.onClick = testClick; 
    } else {
        if (authResult.error)
        $( ".AS_Authorize" ).show();
    	$('#authorize-button').click(handleAuthClick);
        //authorizeButton.onclick = handleAuthClick;
    }
}

function testClick(){
	var email = $('#txtEmail').val();
	if (email != ''){
		makeApiCall(email);
	}
	else{
		alert('Must enter an email value.')
	}
}

function handleApiSuccess(e){
	$(".AS_Success").attr("href", e)
	$( ".AS_Success" ).show();
}

function receive(e) {
    console.log(e);
}

function makeApiCall(email) {
  
    var params = {
        "userEmail" : email
    };
    var url = AuthScope.ScriptObjects.ScriptUrl;
    var request = jQuery.get(
        url,
        params,
        function(e){
        	handleApiSuccess(e);
        },
        'jsonp'
    )  
    .done(function(e) {
    	console.log( "second success" );
  	})
  	.fail(function(e) {
    	alert( "error" );
  	})
  	.always(function() {
    	console.log( "finished" );
  	});
}

