const place = ol.proj.fromLonLat([99.006825, 2.503347])

const sumut = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/sumatera.json'
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(77, 148, 255)',
      width: 1
    }),
  })
});


// label penduduk
const labelStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '13px Calibri,sans-serif',
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 4,
    }),
  }),
});

const countryStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: 'rgba(255, 255, 255, 0.6)',
  }),
  stroke: new ol.style.Stroke({
    color: '#319FD3',
    width: 1,
  }),
});
const style = [countryStyle, labelStyle];

const rekom = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/rekom.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgb(51, 204, 51)'
    }),
  })
});

const radpelabuhan = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/bufferpelabuhan.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(51, 50, 51,0.5)'
    }),
  })
});

const radtransimi = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/jalantransmisi.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(100, 100, 50,0.5)'
    }),
  })
});

const radbanjir = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/bufferbanjir.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255,50,60,0.8)'
    }),
  })
});

const radwisata = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/bufferwisata.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(100,50,255,0.8)'
    }),
  })
});

const pelabuhan = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/pelabuhan.json',
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [2, 20],
      anchorXUnits: 'fraticon',
      anchorYUnits: 'pixels',
      src: 'icon/harbor2.png'
    }))
  })
});


const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }), sumut
  ],
  view: new ol.View({
    center: place,
    zoom: 8,
  }),
});


// layout button

const btn5 = document.getElementById('btn5');
const btn4 = document.getElementById('btn4');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn = document.getElementById('btn');
var nl0 = 0
nl1 = 0
nl2 = 0
nl3 = 0
nl4 = 0
nl5 = 0;
// pelabuhan
btn.addEventListener('click', function onClick() {
  if (nl0 == 0) {
    map.addLayer(radpelabuhan);
    btn.style.backgroundColor = 'blue';
    btn.style.color = 'white';
    nl0 = 1;
  } else {
    btn.style.backgroundColor = 'rgb(227, 219, 220)';
    btn.style.color = 'black';
    map.removeLayer(radpelabuhan);
    nl0 = 0;
  }
});

// banjir
btn1.addEventListener('click', function onClick() {
  if (nl1 == 0) {
    map.addLayer(radbanjir);
    btn1.style.backgroundColor = 'blue';
    btn1.style.color = 'white';
    nl1 = 1;
  } else {
    btn1.style.backgroundColor = 'rgb(227, 219, 220)';
    btn1.style.color = 'black';
    map.removeLayer(radbanjir);
    nl1 = 0;
  }
});

// daerah wisata
btn2.addEventListener('click', function onClick() {
  if (nl2 == 0) {
      map.addLayer(radwisata);
    btn2.style.backgroundColor = 'blue';
    btn2.style.color = 'white';
    nl2 = 1;
  } else {
    btn2.style.backgroundColor = 'rgb(227, 219, 220)';
    btn2.style.color = 'black';
    map.removeLayer(radwisata);
    nl2 = 0;
  }
});

// daerah transmisi
btn3.addEventListener('click', function onClick() {
  if (nl3 == 0) {
    map.addLayer(radtransimi);
    btn3.style.backgroundColor = 'blue';
    btn3.style.color = 'white';
    nl3 = 1;
  } else {
    btn3.style.backgroundColor = 'rgb(227, 219, 220)';
    btn3.style.color = 'black';
    map.removeLayer(radtransimi);
    nl3 = 0;
  }
});

// daerah rekom
btn4.addEventListener('click', function onClick() {
  if (nl4 == 0) {
    map.addLayer(rekom);
    btn4.style.backgroundColor = 'blue';
    btn4.style.color = 'white';
    nl4 = 1;
  } else {
    btn4.style.backgroundColor = 'rgb(227, 219, 220)';
    btn4.style.color = 'black';
    map.removeLayer(rekom);
    nl4 = 0;
  }
});



//menampilkan pop up
var container = document.getElementById('popup'),
  content_element = document.getElementById('popup-content'),
  closer = document.getElementById('popup-closer');

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
}

//memunculkan popup overlay
var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  offset: [0, -10]
});

map.addOverlay(overlay);
var fullscreen = new ol.control.FullScreen();
map.addControl(fullscreen);

//menampilkan fungsi evt atau event
map.on('click', function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel,
    function (feature, layer) {
      return feature;
    });
  if (feature) {
    var geometry = feature.getGeometry();
    var coord = geometry.getCoordinates();

    if (feature.get('gambar') == null) {
      console.log(feature.get('jlhpddk'));
      var content = '';
    } else {
      var content = '<div style="min-width:400px;"><div class="row"><div class="col">'
        + '<b>Nama<br></b>'
        + feature.get('nama') + '<br><b>Keterangan</b><br>'
        + feature.get('keterangan') + '<br>' +
        '</div><div class="col">'
        + '<img style="max-width:200px;" src="img/' + feature.get('gambar') + '" class="img" />' +
        '</div></div>';
    }



    content_element.innerHTML = content;
    overlay.setPosition(coord);
    console.info(feature.getProperties());
  }
});
