// function checkUser(){
//     if(!localStorage.getItem("userKey")){
//         if(window.name != "index"){
//             window.location.href ="../index.html";
//         }
//     }else{
//         if(window.name == "index"){
//             window.location.href ="pages/page1.html";
//         }
//     }
// }
// checkUser();
// function logout(){
//     localStorage.removeItem("userKey");
//     //checkUser();
// }




    function popup(){
        // _cr("theBody","style","popupStyle");
        // _("popupStyle").innerHTML = ".popupCont{position:absolute;width:100%;height:100%;background:rgba(0,0,0,0.4);}"
        _cr("theBody","div","popupCont");
        _("popupCont").setAttribute("class", "popupCont");
    
        _cr("popupCont","div","popup");
        _("popup").setAttribute("class", "popup");
    }popup();