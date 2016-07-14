$(document).on("ready",function(){

    var s = document.createElement("script");
    s.src = chrome.extension.getURL("block.js");
    (document.head||document.body).appendChild(s);

    //chrome.runtime.sendMessage({func: func, attrs: attr}, function(response) {
    //    console.log("Background page responded: " + response);
    //});
});