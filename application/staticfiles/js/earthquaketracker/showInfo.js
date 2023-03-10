console.log('showInfo.js loaded.')
function showInfo(){
    var x = document.getElementById("info");
    /* add '|| x.style.display == '')' otherwise only appears on second click 
    https://www.sitepoint.com/community/t/toggle-javascript-works-on-second-click-not-first/3583/6 
    */
    if (x.style.display === "none" || x.style.display == '') {
        x.style.display = "flex";
        //change the value of the input class when clicked
    } else {
        x.style.display = "none";
    }
}