const place = ol.proj.fromLonLat([99.006825, 2.503347])

const sumut = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/sumatera.json'
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'rgb(77, 148, 255)',
      width: 2
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


const penduduk = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/jmlpenduduk.json'
  }),
  style: function (feature) {
    labelStyle
      .getText()
      .setText([
        feature.get('id')+". ",
        'bold 13px Calibri,sans-serif',
        `${feature.get('nama')}`,
        '',
        '\n',
        '',
        `${feature.get('jlhpddk')} Penduduk`,
        'italic 11px Calibri,sans-serif',
      ]);
    return style;
  }
});

const rekom = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/rekom.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(51, 204, 51,0.7)'
    }),
  })
});

const banjir = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/databanjir.json'
  }),
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'Red'
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

const wisata = new ol.layer.Vector({
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'data/wisata.json',
  }),
  style: new ol.style.Style({
    image: new ol.style.Icon(({
      anchor: [2, 20],
      anchorXUnits: 'fraticon',
      anchorYUnits: 'pixels',
      src: 'icon/wisata.png'
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
var nl1 = 0
nl2 = 0
nl3 = 0
nl4 = 0
nl5 = 0;
// pelabuhan
btn.addEventListener('click', function onClick() {
  if (nl1 == 0) {
    map.addLayer(pelabuhan);
    btn.style.backgroundColor = 'blue';
    btn.style.color = 'white';
    nl1 = 1;
  } else {
    btn.style.backgroundColor = 'rgb(227, 219, 220)';
    btn.style.color = 'black';
    map.removeLayer(pelabuhan);
    nl1 = 0;
  }
});

// daerah rekomendasi
btn2.addEventListener('click', function onClick() {
  if (nl2 == 0) {
    map.addLayer(rekom);
    btn2.style.backgroundColor = 'blue';
    btn2.style.color = 'white';
    nl2 = 1;
  } else {
    btn2.style.backgroundColor = 'rgb(227, 219, 220)';
    btn2.style.color = 'black';
    map.removeLayer(rekom);
    nl2 = 0;
  }
});

// daerah wisata
btn3.addEventListener('click', function onClick() {
  if (nl3 == 0) {
    map.addLayer(wisata);
    btn3.style.backgroundColor = 'blue';
    btn3.style.color = 'white';
    nl3 = 1;
  } else {
    btn3.style.backgroundColor = 'rgb(227, 219, 220)';
    btn3.style.color = 'black';
    map.removeLayer(wisata);
    nl3 = 0;
  }
});

// daerah banjir
btn4.addEventListener('click', function onClick() {
  if (nl4 == 0) {
    map.addLayer(banjir);
    btn4.style.backgroundColor = 'blue';
    btn4.style.color = 'white';
    nl4 = 1;
  } else {
    btn4.style.backgroundColor = 'rgb(227, 219, 220)';
    btn4.style.color = 'black';
    map.removeLayer(banjir);
    nl4 = 0;
  }
});


// daerah Penduduk
btn5.addEventListener('click', function onClick() {
  if (nl5 == 0) {
    map.addLayer(penduduk);
    btn5.style.backgroundColor = 'blue';
    btn5.style.color = 'white';
    nl5 = 1;
  } else {
    btn5.style.backgroundColor = 'rgb(227, 219, 220)';
    btn5.style.color = 'black';
    map.removeLayer(penduduk);
    nl5 = 0;
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
