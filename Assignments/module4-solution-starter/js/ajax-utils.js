//IIFE starts with the line here (funtion(gloabal)
(function (global) {

// Set up a namespace for our utility
var ajaxUtils = {};


// Returns an HTTP request object
//not directly available to user of ajaxUtils.js
function getRequestObject() {
  if (window.XMLHttpRequest) {
    return (new XMLHttpRequest());
  } 
  else if (window.ActiveXObject) {
    // For very old IE browsers (optional)
    return (new ActiveXObject("Microsoft.XMLHTTP"));
  } 
  else {
    global.alert("Ajax is not supported!");
    return(null); 
  }
}


// Makes an Ajax GET request to the server to request a 'requestUrl'
ajaxUtils.sendGetRequest = 
  function(requestUrl, responseHandler, isJsonResponse) {
    var request = getRequestObject(); //uses XMLHTTP request from above
    request.onreadystatechange = //browser to server network communcations
      function() { 
        handleResponse(request, //variable from line above
                       responseHandler,
                       isJsonResponse); 
      };
    request.open("GET", requestUrl, true);//true is for aysnchronouse
    request.send(null); // for POST only
  };


// Only calls user provided 'responseHandler'
// function if response is ready
// and not an error
function handleResponse(request,
                        responseHandler,
                        isJsonResponse) {
  if ((request.readyState == 4) &&
     (request.status == 200)) {

    // Default to isJsonResponse = true
    if (isJsonResponse == undefined) {
      isJsonResponse = true;
    }

    if (isJsonResponse) {
      responseHandler(JSON.parse(request.responseText));
    }
    else {
      responseHandler(request.responseText);
    }
  }
}


// Expose utility to the global object
global.$ajaxUtils = ajaxUtils;


})(window);

