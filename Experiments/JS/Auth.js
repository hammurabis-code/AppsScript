var AuthScope = {}
AuthScope.clientId = "294242731306-rrpi0scsiv9bbteru3kkq97vtdo20am7.apps.googleusercontent.com";
AuthScope.apiKey = "AIzaSyAS1s958FZcVtCZD9uX8DFAR2-GKlNd3Ik";
AuthScope.apiScopes = "https://www.googleapis.com/auth/forms";
AuthScope.callBack = "?callback=postCallBack";
AuthScope.ScriptObjects = [];
AuthScope.ScriptObjects.scriptId = "MS7nIL3cEDaqmHH0oRiKTTdXTT3ICWQrs";
AuthScope.ScriptObjects.ScriptUrl = "http://script.google.com//v1/scripts/" + AuthScope.ScriptObjects.scriptId + ":run";
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
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
        authorizeButton.style.visibility = 'hidden';
        makeApiCall();
    } else {
        if (authResult.error)
        authorizeButton.style.visibility = '';
        authorizeButton.onclick = handleAuthClick;
    }
}

function makeApiCall() {
  
    var params = {
        "parameters": [
            "test@advantagetooling.com"
        ]
    };
    var url = AuthScope.ScriptObjects.ScriptUrl + AuthScope.callBack;
    var request = jQuery.ajax({
        crossDomain: true,
        url: url,
        method: "GET",
        dataType: "jsonp",
        data: params
    });
    //var xhr = createCORSRequest('POST', AuthScope.ScriptObjects.SciprUrl);
    //if (!xhr) {
    //    throw new Error('CORS not supported');
    //}
    //var oauthToken = gapi.auth.getToken();
    //xhr.setRequestHeader('Authorization',
    //  'Bearer ' + oauthToken.access_token);
    //xhr.send(params);
    //xhr.onreadystatechange = function (oEvent) {
    //    if (xhr.readyState === 4) {
    //        if (xhr.status === 200) {
    //            console.log(xhr.responseText)
    //        } else {
    //            console.log("Error", xhr.statusText)
    //        }
    //    }
    //}

    //gapi.client.load('plus', 'v1', function () {
    //    var request = gapi.client.plus.people.get({
    //        'userId': 'me'
    //    });
    //    request.execute(function (resp) {
    //        var heading = document.createElement('h4');
    //        var image = document.createElement('img');
    //        image.src = resp.image.url;
    //        heading.appendChild(image);
    //        heading.appendChild(document.createTextNode(resp.displayName));
    //        document.getElementById('content').appendChild(heading);
    //    });
    //});
}

function postCallBack(e) {
    consol.log(e);
}

//function postCallback() {
//    if (xhr.readyState == 4 && xhr.status == 200) {
//        progressDone();   //loading is finished
//        $('#error').hide();
//        document.getElementById("table").innerHTML = xmlhttp.responseText;

//        // continue to process post callback.
//        resetFilters();
//    }
//    else {
//        // report error with fetch

//        /*if(xmlhttp.status==404 || xmlhttp.responseText == "")
//            $('#error').show();*/
//        //$('#error').show();
//    }
//}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}
