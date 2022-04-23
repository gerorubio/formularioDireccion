// Evento que se ejecuta cuando se busca un código postal presionando el buton de buscar
document.getElementById('btnCpBuscar').addEventListener('click', () => {
  // Input select
  var listaAsentamiento = document.getElementById('colonia')
  // Se crea una request
  var request = new XMLHttpRequest()
  // Se guarda el valor del código postal
  var cp = document.getElementById('cpBuscar').value
  
  // Utilizamos la API de COPOMEX
  // Token de prueba
  request.open('GET', 'https://api.copomex.com/query/info_cp/' + cp + '?type=simplified&token=pruebas', true)
  // Token real
  // request.open('GET', 'https://api.copomex.com/query/info_cp/' + cp + '?type=simplified&token=c5b05a80-9d5a-4752-92c8-ee85ba8f83be', true)

  request.onload = function () {
    // Acceso al json
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      // Creación de lista de colonias identificadas por el código postal buscado
      var asentamiento = data.response.asentamiento
      asentamiento.forEach(element => {
        var option = document.createElement("option");
        option.value = element
        option.text = element
        listaAsentamiento.appendChild(option)
      });
      // Autocompletado del municipio
      document.getElementById('municipio').value = data.response.municipio
      // Autocompletado del estado
      document.getElementById('estado').value = data.response.estado
      // Autocompletado del cp (Este sera el usado para ingresar en el form ya que no se podrá editar)
      document.getElementById('cp').value = cp
    } else {
      const errorMessage = document.createElement('marquee')
      errorMessage.textContent = `Gah, it's not working!`
      app.appendChild(errorMessage)
    }
  }

  request.send()
})

