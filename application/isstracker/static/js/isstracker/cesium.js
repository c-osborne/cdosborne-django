// Your access token can be found at: https://cesium.com/ion/tokens.
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYTIxYzJhOC0wYTMyLTRmMTQtYmM5Yi0zMGQxM2FkZGUzODciLCJpZCI6NDM0NDAsImlhdCI6MTYxMjYzODEwN30.7V2jDSomIyzafTtu5WdXLhNX69IDU9kUFWNYZhy69wY';

// Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
const viewer = new Cesium.Viewer('cesiumContainer', {
  //terrainProvider: Cesium.createWorldTerrain(), //commented out to improve performance
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  animation: false,
  creditsDisplay: true,
  timeline: false,
  fullscreenButton: false,
  
});    

//CESIUM SAMPLE DATA
// https://github.com/CesiumGS/cesium/tree/master/Apps/SampleData


// pointEntity with model
const pointEntity = viewer.entities.add({    
  model : {
          uri : '../static/model/isstracker/iss.glb',
          scale: 1000,
  },
  name: 'International Space Station',
  description: '\
  <img\
    width="50%"\
    style="float:left; margin: 0 1em 1em 0;"\
    src="../static/images/isstracker/iss-emblem.png"/>\
  <p>\
    The International Space Station (ISS) is a modular space station in low Earth orbit.\
  </p>\
  <p>\
    It is a multinational collaborative project involving five \
    participating space agencies: NASA (USA), Roscosmos (Russia), \
    JAXA (Japan), ESA (Europe), CSA (Canada). The ownership and use \
    of the space station is established by intergovernmental treaties\
    and agreements. \
  </p>\
  <p>\
    The station serves as a microgravity and space \
    environment research laboratory in which scientific research is \
    conducted in astrobiology, astronomy, meteorology, and physics. \
  </p>\
  <p>\
    Source: \
    <a style="color: WHITE"\
      target="_blank"\
      href="https://en.wikipedia.org/wiki/International_Space_Station">Wikpedia</a>\
  </p>\
  <p>\
  <a style="color: WHITE"\
    target="_blank"\
    href= "https://www.nasa.gov/mission_pages/station/main/index.html">Learn more </a>\
  </p>',
  viewFrom: new Cesium.Cartesian3(27000, -19000, 19000), //set the default view when loaded
});

//get the ISS position------------------------
//https://www.youtube.com/watch?v=uxf0--uiX0I
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

async function getISS(){
  const response = await fetch(api_url);
  const data = await response.json();
  document.getElementById("lat").textContent = data.latitude.toFixed(2);
  document.getElementById("lng").textContent = data.longitude.toFixed(2);
  document.getElementById("alt").textContent = data.altitude.toFixed(2);

  //console.log(data);
  //construct the data point with altitude (times by 1000 as value is in km and metres needed)
  const dataPoint = { longitude: data.longitude, latitude: data.latitude, height: data.altitude*1000 };

  //update the pointEntity position (based on retrieved json data)
  pointEntity.position= new Cesium.Cartesian3.fromDegrees(dataPoint.longitude, dataPoint.latitude, dataPoint.height);
  
  //track pointEntity using trackedEntity
  viewer.trackedEntity = pointEntity;
};

//call the function
getISS();

//set an interval (2 second)
setInterval(getISS, 2000);