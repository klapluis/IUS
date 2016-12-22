angular.module('app.controllers', [])
        /** Vies de Buscar centros de salud**/
        .controller('buscarUnidadSaludCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
                $http.get('https://sius.000webhostapp.com/index.php/UnidadSalud_SW/').success(function(data) {
                    console.log(data);
                    $scope.unidadSalud = data.response;
                })
                $scope.limpiar = function(q) {
                  if(q != null){
                      q.buscar = "";
                  }
                }
            }])
        /** Controlador de la view de maps **/
        .controller('mapsCtrl', ['$scope', '$http', '$state', '$location', '$compile', function($scope, $http, $state, $location,$compile) {
                $scope.datos = {id: ''};
                $scope.posicionuser;
                posicionUser();
                $http.get('https://sius.000webhostapp.com/index.php/UnidadSalud_SW/').success(function(data) {
                    console.log('JSON Unidades de Salud: ');
                    console.log(data);
                    for (var i = 0; i < data.response.length; i++) {
                        var posUnidadSalud = new google.maps.LatLng(data.response[i].LATITUD, data.response[i].LONGITUD);//posicion de la undiad de Salud
                        var marker = new google.maps.Marker({
                            position: posUnidadSalud,
                            map: $scope.map,
                            icon: 'img/icon.png'
                        });
                        $scope.infowindow = new google.maps.InfoWindow();
                        var contenido =
                        '<h6><a href="#/informacionUS/'+data.response[i].IDUNIDADSALUD+'" class="button  button-bloc">' + data.response[i].NOMBRE_OFICIAL + '<br> Mas Información</a></h6>';
                        var compiledContent = $compile(contenido)($scope)
                        google.maps.event.addListener(marker, 'click', (function(marker, contenido, scope, datosU) {
                            return function() {
                                scope.infowindow.setContent(contenido);
                                scope.infowindow.open(scope.map, marker);
                                var directionsService = new google.maps.DirectionsService;
                                var directionsDisplay = new google.maps.DirectionsRenderer;
                                directionsDisplay.setMap($scope.map);
                                directionsService.route({
                                    origin: $scope.posicionuser,
                                    destination: this.position,
                                    travelMode: google.maps.TravelMode.DRIVING,
                                }, function(response, status) {
                                    if (status === google.maps.DirectionsStatus.OK) {
                                        directionsDisplay.setDirections(response);
                                    } else {
                                        window.alert('Directions request failed due to ' + status);
                                    }
                                });
                            };
                        })(marker, compiledContent[0], $scope));
                    }
                });
                if (document.readyState === "complete") {
                    initialize();
                } else {
                    google.maps.event.addDomListener(window, 'load', initialize);
                }
                /***************** FUNCICONES***********/
                //Ubicacion del Usuario
                function posicionUser() {
                    navigator.geolocation.getCurrentPosition(function(pos) {
                        console.log('POS USER', pos);
                        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                        var posUser = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                        $scope.posicionuser = posUser;
                        var marker = new google.maps.Marker({
                            position: $scope.posicionuser,
                            map: $scope.map,
                            icon: 'https://dl.dropboxusercontent.com/u/20056281/Iconos/male-2.png',
                        });
                    }, function(error) {
                        alert('Ubicacion Desconocida: ' + error.message);
                    });
                }
                // funcion del boton atras
                $scope.atras = function() {
                    $location.url('/inicio');
                }
                //mapa publico o privado
                $scope.filtrar = function(datos) {
                    console.log("ID del filtro");
                    console.log(datos.id);
                    $http.get('https://sius.000webhostapp.com/index.php/UnidadSalud_SW/lucro/' + datos.id).success(function(data) {
                        posicionUser();
                        for (var i = 0; i < data.response.length; i++) {
                            var posUnidadSalud = new google.maps.LatLng(data.response[i].LATITUD, data.response[i].LONGITUD);
                            //posicion de la undiad de Salud
                            var distancia = google.maps.geometry.spherical.computeDistanceBetween($scope.posicionuser, posUnidadSalud);
                            if (distancia <= 5000) {
                                var marker = new google.maps.Marker({
                                    position: posUnidadSalud,
                                    map: $scope.map,
                                    icon: 'img/icon.png'
                                });
                                $scope.infowindow = new google.maps.InfoWindow();
                                var contenido = '<h6><a href="#/informacionUS/'+data.response[i].IDUNIDADSALUD+'" class="button button-bloc">' + data.response[i].NOMBRE_OFICIAL + '<br> Mas Información</a></h6>';;
                                var compiledContent = $compile(contenido)($scope)
                                google.maps.event.addListener(marker, 'click', (function(marker, contenido, scope) {
                                    return function() {
                                      scope.infowindow.setContent(contenido);
                                      scope.infowindow.open(scope.map, marker);
                                      var directionsService = new google.maps.DirectionsService;
                                      var directionsDisplay = new google.maps.DirectionsRenderer;
                                      directionsDisplay.setMap($scope.map);
                                      directionsService.route({
                                          origin: $scope.posicionuser,
                                          destination: this.position,
                                          travelMode: google.maps.TravelMode.DRIVING,
                                      }, function(response, status) {
                                          if (status === google.maps.DirectionsStatus.OK) {
                                              directionsDisplay.setDirections(response);
                                          } else {
                                              window.alert('Directions request failed due to ' + status);
                                          }
                                      });
                                    };
                                })(marker, compiledContent[0], $scope));
                            }
                        }
                    });
                    if (document.readyState === "complete") {
                        initialize();
                    } else {
                        google.maps.event.addDomListener(window, 'load', initialize);
                    }
                };
                //Inicializa el mapa de google
                function initialize() {
                    var myLatlng = new google.maps.LatLng(-3.9935438, -79.2061648);
                    var mapOptions = {
                        center: myLatlng,
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                    $scope.map = map;
                }
            }])

        /** Datos una Unidad de Salud **/
        .controller('informacionUnidadDeSaludCtrl', ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
                var id = $stateParams.id;
                console.log('id US: ' + id);
                $http.get('https://sius.000webhostapp.com/index.php/UnidadSalud_SW/' + id).success(function(data) {
                    console.log('Datos de la US por ID: ');
                    $scope.datosUS = data.response[0];
                    console.log(data);
                });
                $scope.atras = function() {
                    $location.url('/maps');
                }
            }])

        /** Datos de las Areas de Especialidad **/
        .controller('areasDeEspecialidadCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
                var id = $stateParams.id;
                $http.get('https://sius.000webhostapp.com/index.php/AreaEspecialidad_SW/' + id).success(function(data) {
                    $scope.especialidad = data.response;
                    console.log('Datos de la AE: ');
                    console.log(data);
                });
            }])

        /** Datos las Especialidades **/
        .controller('informacionEspecialidadCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
                var id = $stateParams.id;
                $http.get('https://sius.000webhostapp.com/index.php/Especialidad_SW/' + id).success(function(data) {
                    $scope.especialidad = data.response;
                    console.log('Datos de las E: ');
                    console.log(data);
                });
            }])

        /** Proceso de Servicios **/
        .controller('serviciosCtrl', ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
                var id = $stateParams.id;
                $scope.id = id;
                $http.get('https://sius.000webhostapp.com/index.php/Servicios_SW/id/' + id).success(function(data) {
                    $scope.servicios = data.response;
                    console.log('Servicios: ');
                    console.log(data);
                });
                $scope.atras = function() {
                    $location.url('/informacionUS/' + $scope.id);
                }
            }])

        /** Buscar Especialidades view**/
        .controller('buscarEspecialidadesCtrl', ['$scope', '$stateParams', '$http', function($scope, $stateParams, $http) {
                $http.get('https://sius.000webhostapp.com/index.php/Especialidad_SW').success(function(data) {
                    $scope.especialidad = data.response;
                    console.log('Datos E a Buscar:');
                    console.log(data);
                });
                $scope.limpiar = function(q) {
                  if(q != null){
                    q.buscar = "";
                  }
                }
            }])

        /** Datos del resultado de la Busqueda de Especialidades**/
        .controller('resultadoBusquedaECtrl', ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
                $scope.nombreE = $stateParams.id;
                console.log('nombre: ' + $scope.nombreE);
                $http.get('https://sius.000webhostapp.com/index.php/AreaEspecialidad_SW/datos/' + $scope.nombreE).success(function(data) {
                    $scope.datos = data.response;
                    console.log('Datos de la consulta:');
                    console.log(data);
                });
            }])

        /** Resultado de la Busqueda de Especialidades**/
        .controller('informacionResultadoBECtrl', ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
                $scope.id = $stateParams.id;
                console.log('id Resultado: ' + $scope.id);
                $http.get('https://sius.000webhostapp.com/index.php/AreaEspecialidad_SW/datosId/' + $scope.id).success(function(data) {
                    $scope.datos = data.response;
                    console.log('informacion Resultado BE de la consulta:');
                    console.log(data);
                    $scope.nombreE = $scope.datos[0].NOMBRE_ESPECIALIDAD;
                });
                $scope.atras = function() {
                    $location.url('/resultadoBE/' + $scope.nombreE);
                }
            }])

        /** Formulario Contribuidor**/
        .controller('contribuidorCtrl', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location) {
                $scope.id = $stateParams.id;
                $scope.datos = {
                    NOMBRE: '',
                    APELLIDO: '',
                    CORREO: '',
                    TELEFONO: ''
                };
                $scope.guardar = function(datos) {
                    console.log(datos);
                    $http.post('https://sius.000webhostapp.com/index.php/Contribuidor_SW/',datos).success(function(data) {
                        console.log('Id Contribuidor: ' + data.response + ' Id US:' + $scope.id);
                        $location.url('/formularioServicio/' + $scope.id + '/' + data.response);
                        $scope.datos = {NOMBRE: '', APELLIDO: '', CORREO: '', TELEFONO: ''};
                    });
                }
            }])

        /** Formulario de Servicios**/
        .controller('formularioServicioCtrl', ['$scope', '$http', '$stateParams', '$location', function($scope, $http, $stateParams, $location) {
                $scope.idC = $stateParams.id;
                $scope.idUS = $stateParams.idUS;
                $http.get('https://sius.000webhostapp.com/index.php/UnidadSalud_SW/' + $scope.idUS).success(function(data) {
                    console.log('Datos de US por ID: ');
                    console.log(data);
                    $scope.datosUS = data.response;
                });
                $scope.guardar = function(datos) {
                    var datosS = {
                        unidad_SaludIDUNIDADSALUD: $scope.idUS,
                        unidad_SaludUNICODIGO: $scope.datosUS.UNICODIGO,
                        contribuidorIDCONTRIBUIDOR: $scope.idC,
                        DESCRIPCION: datos.DESCRIPCION,
                        TELEFONO: datos.TELEFONO,
                        NOMBRE_RESPONSABLE: datos.NOMBRE_RESPONSABLE,
                        HORARIO: datos.HORARIO,
                    };
                    console.log('datos del servicio');
                    console.log(datosS);
                    $http.post('https://sius.000webhostapp.com/index.php/Servicios_SW/', datosS).success(function(data) {
                        var id = data.response;
                        console.log('id Servicio nuevo:' + id);
                        if (id > 0 && id != null) {
                            alert('Su aporte sera revisado por el Administrador, muchas gracias!');
                        }
                    });
                }
                $scope.eliminarC = function() {
                    $http.delete('https://sius.000webhostapp.com/index.php/Contribuidor_SW' + $scope.idC).success(function(data) {
                        console.log(data.response);
                    });
                    $location.url('servicios/' + $scope.idUS);
                }
            }])


        /** View de Inicio**/
        .controller('inicioCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {

            }])

        /** Vies de Ayuda**/
        .controller('ayudaCtrl', ['$scope', '$stateParams', function($scope, $stateParams) {
            }])
