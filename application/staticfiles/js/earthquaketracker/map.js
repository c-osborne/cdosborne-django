console.log("loaded map.js");

//Date---------------------
//see Rumpleteaser answer: https://stackoverflow.com/questions/563406/add-days-to-javascript-date
var date = new Date();
var endDate = new Date(date);
endDate.setDate(date.getDate() + 1);

//convert Date to required format for api link yy--mm-dd
var date = date.toLocaleDateString('en-CA');
var endDate = endDate.toLocaleDateString('en-CA');

//set the value of the datepicker to the current date
document.getElementById('datepicker').value = date;


//Map-----------------------
//create map and set view, zoom
var map = L.map('map', {
    minZoom: 2,
    maxZoom: 19,
    zoomControl: true,
    scrollWheelZoom: false
});


map.setView([0,0], 3);

//basemaps-------------------------			

var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a> Earthquake data from USGS;',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

//create custom user icon 
var icon = L.icon({
    iconUrl: '../static/icons/earthquaketracker/icon.svg',
    iconSize: [25, 25]
});

//get api data from USGS ------------------------
// example for date range: https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02
const api_url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=';

async function getEarthquakes(){
    const response = await fetch(api_url+date+"&endtime="+endDate);
    const data = await response.json();
    console.log(data);
    //get the total number of json features
    var count = data.features.length;
    document.getElementById("count").innerHTML = count;

    //clear the markers
    $(".leaflet-marker-icon").remove(); $(".leaflet-popup").remove();
    //loop through json response 
    for (i in data.features) {
            x = data.features[i];
            //console.log(x.geometry.coordinates[1])
            //define the time: time is in milliseconds since epoch (1970), but called in new Date() will provide readable format. see: https://stackoverflow.com/questions/4631928/convert-utc-epoch-to-local-date
            var time = new Date(x.properties.time);
            //define marker---------------
            //get uses the geometries coordinates for position info
            //coordinates will need to be switch (second value then first)
            L.marker([x.geometry.coordinates[1],x.geometry.coordinates[0]],{icon: icon}).addTo(map).bindPopup("Location: " + x.properties.place +"<br> Magnitude: " + x.properties.mag + "<br> Time: " + time);
            
        }
}
getEarthquakes();


//create the getDate() function that is called onchange of the datepicker element
function getDate(){
    //use window.date to declare the new date as a global variable, so the getEarthquakes() will use the new date
    var selectedDate = document.getElementById("datepicker").value
    console.log(selectedDate);
    var date = new Date(selectedDate);
    var endDate = new Date(date);
    endDate.setDate(date.getDate() + 1);

    //convert Date to required format for api link yy--mm-dd
    window.date = date.toLocaleDateString('en-CA');
    window.endDate = endDate.toLocaleDateString('en-CA');
    console.log(window.date);
    console.log(window.endDate);
    //rerun the getEarthquake function
    getEarthquakes()
}