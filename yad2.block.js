
/**
 @Author Eli Meiler
 @Date 201-10-05



 jQuery requered!!!
 */

var pirsumBlock_ContactWin = undefined;
function openContactForPirsumBlock() {
    if (typeof pirsumBlock_ContactWin === "undefined") {
        var url = "//" + window.location.hostname + "/Contact.php ";
        pirsumBlock_ContactWin = openWindow(url, "Contact Us - AdBlocker",630, 750);
        pirsumBlock_ContactWin.onload = function () {
            //    setTimeout(function(){
            var $winBody = jQuery(pirsumBlock_ContactWin.document.body);
            $winBody.find("#subject").val("\u05d7\u05d5\u05e1\u05dd \u05e4\u05e8\u05e1\u05d5\u05de\u05d5\u05ea").prop("disabled", true);
            $winBody.find('select[name=mailto]').val(4).prop("disabled", true);
            //$winBody.find("form").append("<input />",{'name':'adBlock','value':1});
            $winBody.find("form").append('<input type="hidden" name="PirsumBlocker" value="1" />');
            //    },10);
        };

        pirsumBlock_ContactWin.onbeforeunload = function (e) {
            pirsumBlock_ContactWin = undefined;
        };
    }
    else {
        pirsumBlock_ContactWin.focus();
    }
}
function clear_AdBlockerDetect(){

    if(typeof sessionStorage === 'object'){
        sessionStorage.removeItem('DetectedAdBlocker');
        sessionStorage.removeItem('abAdBlocker');
    }
    if(typeof Y2JS !== "undefined" && typeof Y2JS.cookies !== "undefined" ){
        Y2JS.cookies.deleteCookie('DetectedAdBlocker');
        Y2JS.cookies.deleteCookie('abAdBlocker');
    }
}

function set_AdBlockerDetect(caseIndex){
    var params = getAdBlockerDetect();
    if( caseIndex !== 1 &&
        (typeof params.sessionStore['DetectedAdBlocker'] !== "undefined" ||
        typeof params.cookieData['DetectedAdBlocker'] !== "undefined") ){
        return;//already set
    }
    var abCookie = Y2JS.math.random(1,100);
    var abCookieVal = abCookie <= 50? 'A':'B';

    if( typeof sessionStorage === 'object'){

        sessionStorage.setItem('DetectedAdBlocker', 1);

        sessionStorage.setItem('abAdBlocker',abCookieVal);
    }
    if(typeof Y2JS !== "undefined" && typeof Y2JS.cookies !== "undefined"){

        Y2JS.cookies.setCookie('DetectedAdBlocker',1);
        //Y2JS.cookies.setCookie('abAdBlocker',abCookie);
        Y2JS.cookies.setCookie('abAdBlocker',abCookieVal);
    }
}

function getAdBlockerDetect(){
    var tmp,
        params = {
            sessionStore:{
                'DetectedAdBlocker':undefined,
                'abAdBlocker':undefined
            },
            cookieData:{
                'DetectedAdBlocker':undefined,
                'abAdBlocker':undefined
            }
        };
    if( typeof sessionStorage === 'object'){
        tmp = sessionStorage.getItem('DetectedAdBlocker');
        if(tmp !== null && tmp !== undefined){
            params.sessionStore['DetectedAdBlocker'] = tmp;
            tmp = sessionStorage.getItem('abAdBlocker');
            if(tmp !== null && tmp !== undefined)
                params.sessionStore['abAdBlocker'] = tmp;
        }else{
            params.sessionStore['DetectedAdBlocker'] = undefined;
            params.sessionStore['abAdBlocker'] = undefined;
        }
    }
    if(typeof Y2JS !== "undefined" && typeof Y2JS.cookies !== "undefined"){
        tmp = Y2JS.cookies.getCookie('DetectedAdBlocker');
        if(tmp !== null && tmp !== undefined){
            params.cookieData['DetectedAdBlocker'] = tmp;
            tmp = Y2JS.cookies.getCookie('abAdBlocker');
            if(tmp !== null && tmp !== undefined)
                params.cookieData['abAdBlocker'] = tmp;
        }else{
            params.cookieData['DetectedAdBlocker'] = undefined;
            params.cookieData['abAdBlocker'] = undefined;
        }
    }
    return params;
}

function check_AdBlockerDetection(elementID){//return true

    /*
     if( typeof jQuery === 'undefined' || typeof elementID === 'undefined' || !jQuery("#"+elementID).length){
     return false;
     }
     */

    var BlockAdDetected = false;

    //check classes of fusion
    if(typeof AdBlockDivClasses == "string" && AdBlockDivClasses!=''){
        //prepend to body
        var AdBlockDiv =  $('body').find(AdBlockDivClasses);
        if(typeof AdBlockDiv=="object" && AdBlockDiv.length==1){
            if(!AdBlockDiv.is(':visible')){
                BlockAdDetected = true;
            }
        }
    }

    //check adt funtions
    if(!BlockAdDetected){
        var checked_functions=0;
        var i = ad_fusion_stat_functions.length;
        while(i--){
            //check if function is exists
            try{
                if(ad_fusion_stat_functions[i].length && typeof eval(ad_fusion_stat_functions[i]) !== "undefined"  && typeof eval(ad_fusion_stat_functions[i]) === "function"){
                    //no BlockAds
                    checked_functions++;
                }
            }catch(err) {}
        }

        if(checked_functions ==0 ){
            BlockAdDetected = true;
        }else{
        }
    }

    return BlockAdDetected;
}

function checkElements(params){
    if (typeof params.elementID === "undefined" || !jQuery("#"+params.elementID).length){
        return false;
    }
    else return true;
}
function update_AdBlockerDetection(){
    if(check_AdBlockerDetection()){
        set_AdBlockerDetect(1);

        var params = getPirsumBlockerDetectMessageParams(1);

        if(! checkElements(params)){
            clear_AdBlockerDetect();
            return;
        }

        DisableAdFunctions();



        //###show_PirsumBlocker_Detect_Message();//prev Ver
        //var params = getPirsumBlockerDetectMessageParams(1);
        PirsumBlockerDetectShowMessage(params);

    }else {

        clear_AdBlockerDetect();show_ad
    }
}

function DisableAdFunctions(){
    var functionsList =['','openHotPic','openViewImage','printAds','toggle_favorite',
        'toggleSendFavoritesToMail','load_my_favorites','backToAllResults'];

    var params = getPirsumBlockerDetectMessageParams(2);
    //PirsumBlockerDetectShowMessage(params);

    /*
     show_ad = PirsumBlock_Detected_PopUp_Message;
     openHotPic = PirsumBlock_Detected_PopUp_Message;
     openViewImage = PirsumBlock_Detected_PopUp_Message;
     printAds = PirsumBlock_Detected_PopUp_Message;
     toggle_favorite = PirsumBlock_Detected_PopUp_Message;
     toggleSendFavoritesToMail = PirsumBlock_Detected_PopUp_Message;
     load_my_favorites = PirsumBlock_Detected_PopUp_Message;
     backToAllResults = PirsumBlock_Detected_PopUp_Message;
     */
    for(var f in functionsList){
        //    window[f] = PirsumBlockerDetectShowMessage(params);
        window[functionsList[f]] = function() {PirsumBlockerDetectShowMessage(params);};
    }

    jQuery("a[href*='_info']").on("click",function(e){
        e.preventDefault();
        //    PirsumBlock_Detected_PopUp_Message();
        PirsumBlockerDetectShowMessage(params);
    });
}



function getPirsumBlockerDetectMessageParams(onload){
    var params = {
        elementID:undefined,
        divType:undefined,
        ABMode:undefined,
        bid:undefined,
        CatID:undefined,
        SubCatID:undefined
    };
    var elements ={
        1:'PirsumBlock_Detected_PopUp_Message_onload_',
        2:'PirsumBlock_Detected_PopUp_Message_'
    };
    // set CatID and SubCatID
    // var CatID= -1,SubCatID=-1;//init - error case
    if(typeof newSettings ==='object' &&  newSettings.CatID && newSettings.SubCatID ) {//newSettings && !isNan, isNumeric
        if(!isNaN(newSettings.CatID)){
            params.CatID = parseInt( newSettings.CatID );
        }

        if(!isNaN(newSettings.SubCatID)) {
            params.SubCatID = parseInt(newSettings.SubCatID);
        }
    }
    var adBlockParams = getAdBlockerDetect();
    if( typeof adBlockParams.sessionStore['DetectedAdBlocker'] !== 'undefined' ||
        typeof adBlockParams.cookieData['DetectedAdBlocker'] !== 'undefined'){
        var abCookie = typeof adBlockParams.sessionStore['abAdBlocker'] !== 'undefined' ? adBlockParams.sessionStore['abAdBlocker'] : adBlockParams.cookieData['DetectedAdBlocker'] ;
        if(typeof abCookie !== "undefined" ){// $$ !isNaN(abCookie)
            //    if(parseInt(abCookie) <= 50)  params.ABMode = 'A';
            //    else params.ABMode = 'B';
            params.ABMode = abCookie;
            if( onload !== undefined && !isNaN(onload) ){
                params.elementID =elements[parseInt(onload)] +params.ABMode;
            }
        }
        var BidsMsg = {
            1: {
                4:6660, //MotorCycles
                5:6661 //MotorScooter
            }
        };
        var BidsOnLoad = {
            1: {
                4:6659, //MotorCycles
                5:6659 //MotorScooter
            }
        };

        if( onload === 1){
            if( params.CatID !== undefined && params.SubCatID !== undefined ){
                params.bid = BidsOnLoad[params.CatID][params.SubCatID];
            }
            params.divType = 'Main';
            //    params.bid = '6659';
        }else if( onload === 2) {
            /*
             switch(parseInt(newSettings.SubCatID)){
             case 4 : params.bid = 6660;break;//MotorCycles
             case 5:  params.bid = 6661;break;//MotorScooter
             }*/
            if( params.CatID !== undefined && params.SubCatID !== undefined ){
                params.bid = BidsMsg[params.CatID][params.SubCatID];
            }
            params.divType = 'Ad';
        }
    }
    return params;
}

function PirsumBlockerDetectShowMessage(params){//new

    if (typeof jQuery === "undefined" || typeof params.elementID === "undefined" || !jQuery("#"+params.elementID).length){
        return;
    }
    //var abCookie = getABAdBlockCookie();
    //tpl = {1:'PirsumBlock_Detected_PopUp_Message_onload',100:"PirsumBlock_Detected_PopUp_Message_onload"};
    //use array and search in array
    jQuery.sLightbox({
        content: params.elementID,
        type: "element",
        overlayClose: true,
        overlayOpacity: 0.5,
        complete: function () {
            /*
             var CatID= -1,SubCatID=-1;//init - error case
             if(newSettings && typeof newSettings ==='object' &&  newSettings.CatID && newSettings.SubCatID ) {//&& !isNan, isNumeric
             if(!isNaN(newSettings.CatID)){
             CatID = parseInt( newSettings.CatID );
             }

             if(!isNaN(newSettings.SubCatID)) {
             SubCatID = parseInt(newSettings.SubCatID);
             }
             }*/
            if (typeof dataLayer !== "undefined"){
                if( typeof  params.CatID !== "undefined" && typeof  params.SubCatID !== "undefined"){
                    var GA_EventLabel = 'CatID='+params.CatID+'_SubCatID='+params.SubCatID;
                    var GA_EventAction = 'AdBlockerDiv open '+params.divType+' '+params.ABMode;
                    dataLayer.push({
                        'GA_EventCategory': 'AdBlockerDiv',
                        //'GA_EventAction': 'AdBlockerDiv open Main',//original value
                        'GA_EventAction': GA_EventAction,
                        //'GA_EventLabel': 'AdBlockerDiv open Main',//original value
                        'GA_EventLabel': GA_EventLabel,
                        'event': 'GTM event To GA'
                    });
                }

            }
            if(typeof stat === 'function'){
                if(typeof params.bid !== "undefined"){
                    //stat( '../', 6659, '', '' );
                    stat( '../', params.bid, '', '' );
                }
            }
        }
    });
    jQuery('.PirsumBlocker_X_Symbol_Image').on("click",function(){
        jQuery.sLightbox.close();
    });
}



$(function (){
    update_AdBlockerDetection();
    if (typeof ad_fusion_stat_functions == "object" && ad_fusion_stat_functions.length && typeof AdBlockCategory == "string" && AdBlockCategory != '') {

        setTimeout(function (chromeObject1) {

            return function () {

                var BlockAdDetected = false;
                //for chrome users
                var chromeObject = chromeObject1;

                var today = new Date();
                var dd = (today.getDate()<10?'0':'')+today.getDate();
                var mm = ((today.getMonth()+1)<10?'0':'')+(today.getMonth()+1);//January is 0!
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;


                if (typeof chromeObject == "object") {
                    //chrome user
                    if (typeof sessionStorage == "object" && sessionStorage.length) {
                        for(i in chromeObject){
                            var name = chromeObject[i];
                            if(typeof name !="undefined" && name!=''){
                                var savedDate = new Date(sessionStorage.getItem(name.toString()));

                                if(typeof savedDate!="undefined" && savedDate >= new Date(today)){
                                    delete chromeObject[i];
                                }
                            }

                        }

                        if(Yad2.oSize(chromeObject)== 0){
                            return false;
                        }
                    }
                }else{

                    chromeObject = {};
                }

                //check classes of fusion
                if(typeof AdBlockDivClasses == "string" && AdBlockDivClasses!=''){
                    //prepend to body
                    var AdBlockDiv =  $('body').find(AdBlockDivClasses);
                    if(typeof AdBlockDiv=="object" && AdBlockDiv.length==1){
                        if(!AdBlockDiv.is(':visible')){
                            BlockAdDetected = true;
                        }
                    }
                }

                //check adt funtions
                if(!BlockAdDetected){
                    var checked_functions=0;
                    var i = ad_fusion_stat_functions.length;
                    while(i--){
                        //check if function is exists

                        try{
                            if(ad_fusion_stat_functions[i].length && typeof eval(ad_fusion_stat_functions[i]) !== "undefined"  && typeof eval(ad_fusion_stat_functions[i]) === "function"){
                                //no BlockAds
                                checked_functions++;

                            }
                        }catch(err) {}

                    }

                    if(checked_functions ==0 ){
                        BlockAdDetected = true;
                    }else{
                    }
                }

                //some functions not exist so AdBlock running
                //sending ajax
                if(BlockAdDetected){
                    $.ajax({
                        url: '/ajax/BlockAd.php',
                        method: 'POST',
                        data: {
                            'category': AdBlockCategory,
                            'subcategory': AdBlockSubCategory,
                            'chromeBlockAd': JSON.stringify(chromeObject)
                        },
                        success: function () {
                            for(i in chromeObject){
                                var name = chromeObject[i];
                                if (typeof name != "undefined" && name != '' && typeof sessionStorage == "object")
                                    sessionStorage.setItem(name, today);
                            }
                        }
                    });
                }
            }

        }(chromeBlockAds),1000);

    }
});
