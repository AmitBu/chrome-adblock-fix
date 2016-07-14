/**
 * Created by amit on 11/23/15.
 */
function DisableFunctionsInject(){
    var disableFunctions = ["check_AdBlockerDetection","PirsumBlockerDetectShowMessage"];
    var code = "";

    disableFunctions.forEach(function(val){
        window[val] = function() {
            return false;
        }
    });
}

function yad2(){
    var AdBlockDivClasses = "";
    jQuery.sLightbox.close();
    //DisableFunctionsInject();

    var script = document.createElement("script");
    script.src = "http://www.yad2.co.il/js-new/scripts-new.min.js?v=28.9";
    $(document.head||document.body).append(script);
}

function ynet() {
    CloseAdblockPic();
}

(function(){
    // TODO: check if the url matches yad2
    if(window.location.href.indexOf("yad2.co.il") > -1) {
        yad2();
    }

    if(window.location.href.indexOf("ynet.co.il") > -1) {
        ynet();
    }
})();