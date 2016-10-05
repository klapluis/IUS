angular.module('app.controllers', [])

.controller('mapsCtrl', ['$scope', '$http', '$state','$location', function($scope, $http, $state,$location) {
  $scope.datos={ id:''};
  $scope.atras=function(){
    $location.url('/inicio');
  }
  $scope.filtrar = function(datos){
    console.log("ID del filtro");
    console.log(datos.id);
    $http.get('http://sius.tigrimigri.com/index.php/UnidadSalud_SW/lucro/'+datos.id).success(function(data){
      var posicionuser;
      navigator.geolocation.getCurrentPosition(function (pos) {
        console.log('Got pos', pos);
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        posicionuser = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        var marker = new google.maps.Marker({
          position: myLatlng,
          map: $scope.map,
          icon: 'https://dl.dropboxusercontent.com/u/20056281/Iconos/male-2.png',
        });
      }, function (error) {
         alert('Ubicacion Desconocida: ' + error.message);
      });
      console.log('Unidades de Salud: ');
      console.log(data);
      for (var i = 0; i < data.response.length; i++) {
        if(data.response[i].ESTADO == 1){
        var posUnidadSalud = new google.maps.LatLng(data.response[i].LATITUD, data.response[i].LONGITUD);//posicion de la undiad de Salud
        var marker = new google.maps.Marker({
          position: posUnidadSalud,
          map: $scope.map,
          icon: '/img/icon.png',
          title: data.response[i].NOMBRE_OFICIAL,
          id:data.response[i].IDUNIDADSALUD,
          foto:data.response[i].FOTO
        });
        var infowindow = new google.maps.InfoWindow();
        $scope.stilosIW(infowindow);
          marker.addListener('click', function() {
            var contenido=
            '<div id="iw-container">' +
              '<a href="#/informacionUS/'+this.id+'"><div class="iw-title">'+this.title+'</div>' +
              '<div class="iw-content">' +
                '<img src="http://sius.tigrimigri.com/'+this.foto+'" alt="'+this.title+'" height="100%" width="100%">' +
              '</div>' +
            '</div></a>';
          infowindow.setContent(contenido);
          infowindow.open(map, this);
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap($scope.map);
          directionsService.route({
            origin: posicionuser,
            destination: this.position,
            travelMode: google.maps.TravelMode.DRIVING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
         });
        });
      }else {
        console.log("No Existe Unidades de Salud");
      }
     }
    });
    if (document.readyState === "complete") {
      $scope.initialize();
    }else{
      google.maps.event.addDomListener(window, 'load', $scope.initialize);
    }
  };
  $scope.stilosIW = function(infowindow){
    google.maps.event.addListener(infowindow, 'domready', function() {
      var iwOuter = $('.gm-style-iw');
      var iwBackground = iwOuter.prev();
      iwBackground.children(':nth-child(2)').css({'display' : 'none'});
      iwBackground.children(':nth-child(4)').css({'display' : 'none'});
      iwOuter.parent().parent().css({left: '10px'});
      iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
      iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
      iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
      var iwCloseBtn = iwOuter.next();
      iwCloseBtn.css({opacity: '1', right: '0px', top: '3px', border: '1px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});
      if($('.iw-content').height() < 140){
        $('.iw-bottom-gradient').css({display: 'none'});
      }
      iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
      });
    });
  }
  $scope.initialize=function() {
    var myLatlng = new google.maps.LatLng(-3.9935438, -79.2061648);
    var mapOptions = {
      center: myLatlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),mapOptions);
    $scope.map = map;
  }
   var posicionuser;
    navigator.geolocation.getCurrentPosition(function (pos) {
      console.log('Got pos', pos);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLatlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      posicionuser = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      var marker = new google.maps.Marker({
        position: myLatlng,
        map: $scope.map,
        icon: 'https://dl.dropboxusercontent.com/u/20056281/Iconos/male-2.png',
      });
    }, function (error) {
      alert('Ubicacion Desconocida: ' + error.message);
    });
    $http.get('http://sius.tigrimigri.com/index.php/UnidadSalud_SW').success(function(data){
      console.log('Unidades de Salud: ');
      console.log(data);
      for (var i = 0; i < data.response.length; i++) {
        if(data.response[i].ESTADO == 1){
          var posUnidadSalud = new google.maps.LatLng(data.response[i].LATITUD, data.response[i].LONGITUD);//posicion de la undiad de Salud
          var marker = new google.maps.Marker({
            position: posUnidadSalud,
            map: $scope.map,
            icon: '/img/icon.png',
            title: data.response[i].NOMBRE_OFICIAL,
            id:data.response[i].IDUNIDADSALUD,
            foto:data.response[i].FOTO
          });
          var infowindow = new google.maps.InfoWindow();
          $scope.stilosIW(infowindow);
          marker.addListener('click', function() {
          var contenido=
          '<div id="iw-container">' +
            '<a href="#/informacionUS/'+this.id+'"><div class="iw-title">'+this.title+'</div>' +
            '<div class="iw-content">' +
              '<img src="http://sius.tigrimigri.com/'+this.foto+'" alt="'+this.title+'" height="100%" width="100%">' +
            '</div>' +
          '</div></a>';
          infowindow.setContent(contenido);
          infowindow.open(map, this);
          var directionsService = new google.maps.DirectionsService;
          var directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap($scope.map);
          directionsService.route({
                origin: posicionuser,
                destination: this.position,
                travelMode: google.maps.TravelMode.DRIVING,
              }, function(response, status) {
                if (status === google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setDirections(response);
                } else {
                  window.alert('Directions request failed due to ' + status);
                }
              });
            });
          }else {
            console.log("No Existe Unidades de Salud");
          }
        }
      });
    if (document.readyState === "complete") {
      $scope.initialize();
    }else{
      google.maps.event.addDomListener(window, 'load', $scope.initialize);
    }
  }])
/** Datos una Unidad de Salud **/
  .controller('informacionUnidadDeSaludCtrl', ['$scope', '$stateParams','$http','$location', function ($scope, $stateParams,$http,$location) {
    var id=$stateParams.id;
    console.log('id US: '+id);
    $http.get('http://sius.tigrimigri.com/index.php/UnidadSalud_SW/'+id).success(function(data){
      console.log('Datos de la US por ID: ');
      $scope.datosUS=data.response[0];
      console.log(data);
    });
    $scope.atras=function(){
      $location.url('/maps');
    }
}])
/** Datos de las Areas de Especialidad **/
.controller('areasDeEspecialidadCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams,$http) {
  var id=$stateParams.id;
  $http.get('http://sius.tigrimigri.com/index.php/AreaEspecialidad_SW/'+id).success(function(data){
      $scope.especialidad=data.response;
      console.log('Datos de la AE: ');
      console.log(data);
  });

}])
/** Datos las Especialidades **/
.controller('informacionAEspecialidadCtrl', ['$scope', '$stateParams','$http', function ($scope, $stateParams,$http) {
  var id=$stateParams.id;
  $http.get('http://sius.tigrimigri.com/index.php/Especialidad_SW/'+id).success(function(data){
    $scope.especialidad=data.response;
      console.log('Datos de las E: ');
      console.log(data);
  });
}])
/** Proceso de Servicios **/
.controller('serviciosCtrl', ['$scope', '$stateParams','$http','$location',function ($scope, $stateParams,$http,$location) {
  var id=$stateParams.id;
  $scope.id=id;
  $http.get('http://sius.tigrimigri.com/index.php/Servicios_SW/id/'+id).success(function(data){
    $scope.servicios=data.response;
      console.log('Servicios: ');
      console.log(data);
  });
  $scope.atras=function(){
    $location.url('/informacionUS/'+$scope.id);
  }
}])

/** Buscar Especialidades **/
.controller('buscarEspecialidadesCtrl', ['$scope', '$stateParams','$http',function ($scope, $stateParams,$http) {
  $http.get('http://sius.tigrimigri.com/index.php/Especialidad_SW/').success(function(data){
    $scope.especialidad=data.response;
      console.log('Datos E a Buscar:');
      console.log(data);
 });
 $scope.limpiar = function(q){
   q.buscar="";
 }
}])
.controller('resultadoBusquedaECtrl', ['$scope', '$stateParams','$http','$location',function ($scope, $stateParams,$http,$location) {
  $scope.nombreE=$stateParams.id;
  console.log('nombre: '+$scope.nombreE);
  $http.get('http://sius.tigrimigri.com/index.php/AreaEspecialidad_SW/datos/'+$scope.nombreE).success(function(data){
    $scope.datos=data.response;
      console.log('Datos de la consulta:');
      console.log(data);
  });
}])
.controller('informacionResultadoBECtrl', ['$scope', '$stateParams','$http','$location',function ($scope, $stateParams,$http,$location) {
  $scope.id=$stateParams.id;
  console.log('id Resultado: '+$scope.id);
  $http.get('http://sius.tigrimigri.com/index.php/AreaEspecialidad_SW/datosId/'+$scope.id).success(function(data){
    $scope.datos=data.response;
      console.log('informacion Resultado BE de la consulta:');
      console.log(data);
      $scope.nombreE=$scope.datos[0].NOMBRE;
  });
  $scope.atras=function(){
    $location.url('/resultadoBE/'+$scope.nombreE);
  }
}])
/** formulario Contribuidor***/
.controller('contribuidorCtrl', ['$scope', '$http', '$stateParams','$location', function($scope, $http, $stateParams,$location) {
  $scope.id=$stateParams.id;
  $scope.datos={
    NOMBRE:'',
    APELLIDO:'',
    CORREO:'',
    TELEFONO:''
  };
  $scope.guardar=function(datos){
    console.log(datos);
    $http.post('http://sius.tigrimigri.com/index.php/Contribuidor_SW/',datos).success(function(data){
      console.log('Id Contribuidor: '+data.response+' Id US:'+$scope.id);
      $location.url('/formularioServicio/' + $scope.id+'/'+data.response);
      $scope.datos={NOMBRE:'',APELLIDO:'',CORREO:'',TELEFONO:''};
    });
  }
}])

.controller('formularioServicioCtrl', ['$scope', '$http', '$stateParams','$location', function($scope, $http, $stateParams,$location) {
  $scope.idC=$stateParams.id;
  $scope.idUS=$stateParams.idUS;
  $http.get('http://sius.tigrimigri.com/index.php/UnidadSalud_SW/'+$scope.idUS).success(function(data){
    console.log('Datos de US por ID: ');
    console.log(data);
    $scope.datosUS=data.response;
  });
  $scope.guardar=function(datos){
    var datosS = {
              unidad_SaludIDUNIDADSALUD: $scope.idUS ,
              unidad_SaludUNICODIGO: $scope.datosUS.UNICODIGO,
              contribuidorIDCONTRIBUIDOR: $scope.idC,
              DESCRIPCION: datos.DESCRIPCION,
              TELEFONO:datos.TELEFONO,
              NOMBRE_RESPONSABLE: datos.NOMBRE_RESPONSABLE,
              HORARIO: datos.HORARIO,
    };
    console.log('datos del servicio');
    console.log(datosS);
    $http.post('http://sius.tigrimigri.com/index.php/Servicios_SW/',datosS).success(function(data){
      var id=data.response;
      console.log('id Servicio nuevo:'+id);
      if (id > 0 && id != null) {
        alert('Su aporte sera revisado por el Administrador, muchas gracias!');
      }
    });
  }
  $scope.eliminarC=function(){
    $http.delete('http://sius.tigrimigri.com/index.php/Contribuidor_SW/'+$scope.idC).success(function(data){
      console.log(data.response);
    });
    $location.url('servicios/'+$scope.idUS);
  }
}])
.controller('inicioCtrl', ['$scope', '$stateParams',function ($scope, $stateParams) {
}])

.controller('ayudaCtrl', ['$scope', '$stateParams',function ($scope, $stateParams) {
}])
