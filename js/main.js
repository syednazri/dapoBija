var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth()).padStart(2, '0');
var yyyy = today.getFullYear();
var timeHH = String(today.getHours()).padStart(2, '0');
var timeMM = String(today.getMinutes()).padStart(2, '0');
var timeSS = String(today.getSeconds()).padStart(2, '0');
//var todayFull = dd + MM[mm] + yyyy + "-" + timeHH+":"+timeMM+":"+timeSS;
var todayDate = dd + "/" + mm + "/" + yyyy;
var todayTime = timeHH+":"+timeMM+":"+timeSS;

function _(elfs){
    return document.getElementById(elfs);
}
function _cr(induk, item, id){
    let itemContainer = _(induk);
    let items = document.createElement(item);
    itemContainer.appendChild(items);
    if(id !== ""){
        items.setAttribute("id",id);
        items.setAttribute("name",id);
    }
}
function numRM(theNums){
    return "RM " + Number(theNums).toFixed(2);
}
function xPost(processPage,postParamenter,elements){
    var z = new XMLHttpRequest();
    z.open("POST",processPage,true);
    z.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //z.setRequestHeader("Content-type","application/json");
    // _cr("theBody","div","popup");
    // _cr("popup","div","popupMsg");

    // _("popup").setAttribute("style", "background:rgba(0,0,0,0.8);width:100%;height:100%;position:fixed;top:0;left0;display:flex;")
    // _("popupMsg").innerText = "Processing .... Please wait.";
    z.onreadystatechange = function(){
        if(z.readyState == 4 && z.status == 200){
            // var popupElem = _("popup");
            // popupElem.innerHTML = "";
            // popupElem.parentNode.removeChild(popupElem);
           elements(z.responseText);
        }
    }
    z.send(postParamenter);
}

function gotoPage(pages){
    window.location.href = pages;
}
function gotoStall(pages,stall){
    window.location.href = pages;
    localStorage.setItem("stall",stall);
}
function userIDcheck(){
    var t = JSON.parse(localStorage.getItem("user"));
    xPost(
        processorLink,
        "idCheck="+t.idKey+"&userID="+t.userID,
        function(tfr){
            if(tfr == "false"){
                loginForm();
                alert("Your current data stamp in your device is not exist in our system, We will create new data stamp for you.  Please complete your Profile form.  Thank you.");
                localStorage.removeItem("user");
                localStorage.removeItem("carts");
                gotoPage("index.html");
            }
        }
    )
}
if(!localStorage.getItem("user")){
    loginForm();
    alert("The System unabled to load your info, please login if you already set your password.  Thank you.");
}else{
    userIDcheck();
    createNewCart();
}

function loginForm(){
    // _cr("theBody","div","popupCont");
    _("popupCont").style.display = "flex";
    _cr("popup","h2","Ltitle");
    _("Ltitle").innerHTML = "Login";
    _cr("popup","div","lofinBox");
    _cr("lofinBox","input","loginPhone");
    _cr("lofinBox","input","pswd");
    _cr("lofinBox","input","submit");
    _cr("lofinBox","input","later");

    _("loginPhone").setAttribute("placeholder","Phone Number");
    _("pswd").setAttribute("placeholder","Password");
    _("pswd").setAttribute("type","password");
    _("submit").setAttribute("type","button");
    _("submit").setAttribute("class","btn");
    _("submit").setAttribute("value","Login");
    _("submit").setAttribute("onclick","login()");

    _("later").setAttribute("type","button");
    _("later").setAttribute("class","btn");
    _("later").setAttribute("value","Later");
    _("later").setAttribute("onclick","later()");
}
function createNewUser(){
    xPost(
    processorLink,
    "newUser",
    function(dat){
        var ff = JSON.parse(dat);
        var theUser = {
            "userID":ff.id,
            "username":"",
            "idKey":ff.idKey,
            "address":"",
            "contactNum":"",
            "email":"",
            "userType":"user"
        }
        localStorage.setItem("user",JSON.stringify(theUser));
    })
}
function createNewCart(){
    if(!localStorage.getItem("carts")){
        var fw = '{';
        fw += '"userID":"'+JSON.parse(localStorage.getItem("user")).userID+'",';
        fw += '"dateOrder":"",';
        fw += '"timeOrder":"",';
        fw += '"stat":"inCart",';
        fw += '"orders":{}';
        fw += '}';
        //localStorage.removeItem("carts");
        localStorage.setItem("carts",fw);
    }
}
function login(){
    var ttye = "login";
    ttye += "&phone="+_("loginPhone").value;
    ttye += "&pswd="+_("pswd").value;
    xPost(
    processorLink,
    ttye,
    function(klo){
    if(klo != "false"){
        var hets = JSON.parse(klo);
        console.log(hets.username);
        localStorage.setItem("user",klo);

        var fw = '{';
        fw += '"userID":"'+JSON.parse(localStorage.getItem("user")).userID+'",';
        fw += '"dateOrder":"",';
        fw += '"timeOrder":"",';
        fw += '"stat":"inCart",';
        fw += '"orders":{}';
        fw += '}';
        //localStorage.removeItem("carts");
        localStorage.setItem("carts",fw);
        
        alert("Welcome back "+ hets.username);
        
        window.location.reload();
    }else{
        alert("Wrong Phone Number or Password.\nYour phone number should start with 0 (e.g 012 3345567, remove country code +6 or 6)");
    }});
}
function later(){
    if(!localStorage.getItem("user")){
        alert("This will create a new temporary account for you.  If you haven't register, this temporary account will become your permenant account once you set the password and complete your personel details for this account.");
        _('popupCont').style.display = 'none';
    createNewUser();
    }else{
        window.location.reload();
    }
    //createNewCart();
}
function logout(){
    localStorage.removeItem("user");
    localStorage.removeItem("carts");
    window.location.reload();
}