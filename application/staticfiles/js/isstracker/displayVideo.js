function displayVideo() {
    var x = document.getElementById("live-video");
        /* add '|| x.style.display == '')' otherwise only appears on second click 
        https://www.sitepoint.com/community/t/toggle-javascript-works-on-second-click-not-first/3583/6 
        */
        if (x.style.display === "none" || x.style.display == '') {
            x.style.display = "block";
            //change the value of the input class when clicked
            document.getElementById("toggle-button").innerHTML = 'Hide live feed';
        } else {
            x.style.display = "none";
            document.getElementById("toggle-button").innerHTML = 'Show live feed';
        }
}

displayVideo();
