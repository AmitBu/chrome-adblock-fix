chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
    //chrome.runtime.sendMessage("Got your message.");
    //sendResponse("Got your message.");

    if (msg.func) {
        //var win = chrome.windows.getCurrent();
        //clear_AdBlockerDetect();

        //document.body.style.backgroundColor = "red";
        //chrome.tabs.query({ active: true, windowId: window.WINDOW_ID_CURRENT }, function(tabs) {
        //    console.log(tabs[0]);
        //});
        // For testing only.  delayInMinutes will be rounded up to at least 1 in a
        // packed or released extension.
    }
});