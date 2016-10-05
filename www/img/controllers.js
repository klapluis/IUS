angular.module('app.controllers', [])

.controller('inicioCtrl', function($scope) {

})

.controller('mapsCtrl', function(NgMap) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });
})

.controller('informaciNCtrl', function($scope) {

})

.controller('areasDeEspecialidadCtrl', function($scope) {

})

.controller('informaciNEspecialidadCtrl', function($scope) {

})

.controller('horariosDeAtenciNCtrl', function($scope) {

})

.controller('serviciosCtrl', function($scope) {

})

.controller('buscarMedicoCtrl', function($scope) {

})

.controller('ayudaCtrl', function($scope) {

})

.controller('resultadoBusquedaCtrl', function($scope) {

})

.controller('informaciNDeLosMedicosCtrl', function($scope) {

})

.controller('informaciNDeLosHorariosCtrl', function($scope) {

})
