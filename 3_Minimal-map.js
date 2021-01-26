	// TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com
mapboxgl.accessToken = 'TOKEN';
var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [2.213749, 46.227638],
  zoom: 4
});
