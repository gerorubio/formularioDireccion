// Mapbox API
// Token de mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidnVsY2EiLCJhIjoiY2wyYXZ3OWxyMDFoZTNjbDZxdXhoZW1pdSJ9.kGcPLt5FNjzFe8BiiKXtzw'
//Creacion del mapa
var mapa = new mapboxgl.Map({
  container: 'mapa',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-99.133209, 19.432608],
  zoom: 15
})

var latitud = document.getElementById('latitud')
var longitud = document.getElementById('longitud')

add_marker = (event) => {
  var coordinates = event.lngLat;
  marker.setLngLat(coordinates).addTo(mapa);
  latitud.value = coordinates.lat
  longitud.value = coordinates.lng
}

// Creaión de la variable de tipo marcador
var marker = new mapboxgl.Marker().setLngLat([-99.133209, 19.432608]).addTo(mapa);
mapa.on('click', add_marker.bind(this));



// Evento del boton ubicar
document.getElementById('btnMapa').addEventListener('click', () => {
  var calle = document.getElementById('calle').value.split(' ').join('&')
  var cp = document.getElementById('cp').value.split(' ').join('&')
  var estado = document.getElementById('estado').value.split(' ').join('&')
  var busqueda = calle + "&" + cp + "&" + estado.split(' ').join('&')

  var request = new XMLHttpRequest()
  
  // Solo funciona cuando el token real de copomex esta activo
  // request.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + busqueda + '.json?access_token=pk.eyJ1IjoidnVsY2EiLCJhIjoiY2wyYXZ3OWxyMDFoZTNjbDZxdXhoZW1pdSJ9.kGcPLt5FNjzFe8BiiKXtzw', true)
  
  // Cadena de request para pruebas; Pagina para generar direcciones aleatorias https://www.bestrandoms.com/random-address-in-mx?quantity=6
  var prueba = 'Rio Nilo 06500 Ciudad de Mexico'
  prueba.split(/[,\s]/).join('&')
  request.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + prueba + '.json?access_token=pk.eyJ1IjoidnVsY2EiLCJhIjoiY2wyYXZ3OWxyMDFoZTNjbDZxdXhoZW1pdSJ9.kGcPLt5FNjzFe8BiiKXtzw', true)


  request.onload = function () {
    // Acceso al json
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) { // Exito
      console.log(data.features)
      // Coordenadas de la localizacion buscada
      var lng = data.features[0].center[0]
      var lat = data.features[0].center[1]
      // Colocaciion del marcador
      marker.setLngLat([lng, lat]).addTo(mapa);
      // Movimiento automatico al marcador
      mapa.flyTo({
        center: [lng, lat],
        essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
      latitud.value = lat
      longitud.value = lng
    } else { // Error
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }
  request.send()
})

