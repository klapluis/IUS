angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('inicio', {
      url: '/inicio',
      templateUrl: 'templates/inicio.html',
      controller: 'inicioCtrl'
    })
      .state('maps', {
    url: '/maps',
    templateUrl: 'templates/maps.html',
    controller: 'mapsCtrl'
  })

  .state('informacionUnidadDeSalud', {
    url: '/informacionUS/:id',
    templateUrl: 'templates/informacionUnidadDeSalud.html',
    controller: 'informacionUnidadDeSaludCtrl'
  })

  .state('areasDeEspecialidad', {
    url: '/areasEspecialidad/:id',
    templateUrl: 'templates/areasDeEspecialidad.html',
    controller: 'areasDeEspecialidadCtrl'
  })

  .state('informacionEspecialidad', {
    url: '/informacionAE/:id',
    templateUrl: 'templates/informacionAEspecialidad.html',
    controller: 'informacionAEspecialidadCtrl'
  })
  .state('buscarEspecialidades', {
    url: '/buscarE',
    templateUrl: 'templates/buscarEspecialidades.html',
    controller: 'buscarEspecialidadesCtrl'
  })
  .state('resultadoBusquedaE', {
    url: '/resultadoBE/:id',
    templateUrl: 'templates/resultadoBusquedaE.html',
    controller: 'resultadoBusquedaECtrl'
  })
  .state('informacionResultadoBE', {
    url: '/informacionResultadoBE/:id',
    templateUrl: 'templates/informacionResultadoBE.html',
    controller: 'informacionResultadoBECtrl'
  })
  /**/


  .state('servicios', {
    url: '/servicios/:id',
    templateUrl: 'templates/informacionServicio.html',
    controller: 'serviciosCtrl'
  })

  .state('ayuda', {
    url: '/ayuda',
    templateUrl: 'templates/ayuda.html',
    controller: 'ayudaCtrl'
  })

  .state('contribuidor', {
    url: '/contribuidor/:id',
    templateUrl: 'templates/formularioContribuidor.html',
    controller: 'contribuidorCtrl'
  })

  .state('formularioServicio', {
    url: '/formularioServicio/:idUS/:id',
    templateUrl: 'templates/formularioServicio.html',
    controller: 'formularioServicioCtrl'
  })

$urlRouterProvider.otherwise('/inicio')

});
