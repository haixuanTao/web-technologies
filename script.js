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

map.on('load', function() {
  map.addSource('population', {
    'type': 'geojson',
    'data': 'https://raw.githubusercontent.com/haixuanTao/web-technologies/main/population-francaise-par-departement-2018.geojson'
  });
  map.addSource('sport', {
    'type': 'geojson',
    'data': 'https://raw.githubusercontent.com/haixuanTao/web-technologies/main/ensemble-des-equipements-sportifs-de-lile-de-france.geojson'
  });
  map.addLayer({
    'id': 'population',
    'type': 'fill',
    'source': 'population',
    'layout': {},
    'paint': {
      'fill-opacity': 0.8,
      'fill-color': [
        'interpolate',
        ['linear'],
        ['get', 'population'],
        0,
        '#F2F12D',
        500000,
        '#EED322',
        750000,
        '#E6B71E',
        1000000,
        '#DA9C20',
        2500000,
        '#CA8323',
        5000000,
        '#B86B25',
        7500000,
        '#A25626',
        10000000,
        '#8B4225',
        25000000,
        '#723122'
      ],
    }
  });
  map.addLayer({
    'id': 'sport-circles',
    'type': 'circle',
    'source': 'sport',
    'paint': {
      'circle-color': 'red',
      'circle-opacity': 0.75,
      'circle-radius': 3
    }
  });
});
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl
  })
);
map.on('mousemove', function(e) {
  var features = map.queryRenderedFeatures(e.point);

  // Limit the number of properties we're displaying for
  // legibility and performance
  var displayProperties = [
    'type',
    'properties',
    'id',
    'layer',
    'source',
    'sourceLayer',
    'state'
  ];

  var displayFeatures = features.map(function(feat) {
    var displayFeat = {};
    displayProperties.forEach(function(prop) {
      displayFeat[prop] = feat[prop];
    });
    return displayFeat;
  });

  document.getElementById('features').innerHTML = JSON.stringify(
    displayFeatures,
    null,
    2
  );
});
