var processorLink = "https://dapobija.nineat.com/processor.php";
var adsLink = "https://dapobija.nineat.com/adsPage.php";
var imgLink = "https://dapobija.nineat.com/img/";
var Link = "https://dapobija.nineat.com/";
var dFee;
var minBuy;

function xPost(processPage,postParamenter,elements){
    var z = new XMLHttpRequest();
    z.open("POST",processPage,true);
    z.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    z.onreadystatechange = function(){
        if(z.readyState == 4 && z.status == 200){
            elements(z.responseText);
        }
    }
    z.send(postParamenter);
}
xPost("https://dapobija.nineat.com/vcheck.php","vcheck=1.0.27",
function(opr){
    var dth = JSON.parse(opr);
    dFee = dth.dfee;
    minBuy = dth.minBuy;

    if(dth.vCheck == "false"){
        window.location.href = "https://play.google.com/store/apps/details?id=com.ikhlim.dapobija";
    }
}
)
