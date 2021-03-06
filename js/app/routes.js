angular.module('ulsa.routes', ['ulsa.levels'])
  .config(function($stateProvider, $urlRouterProvider, AccessLevels) {



    $stateProvider.
    state('login', {
      url: '/',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl',
      data: {
        access: AccessLevels.anon
      }
    }).state('principal', {
      url: '/principal',
      templateUrl: 'templates/principal.html',
      controller: 'PrincipalCtrl',
      data: {
        access: AccessLevels.user
      }
    }).state('grupos',{
      url: '/grupos',
      templateUrl: 'templates/grupos.html',
      controller: 'GruposCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('alumnos',{
      url: '/grupos/:id',
      templateUrl: 'templates/alumnos.html',
      controller: 'AlumnosCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('estudiantes',{
      url: '/estudiantes',
      templateUrl: 'templates/estudiantes.html',
      controller: 'EstudiantesCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('viernes',{
      url: '/viernes',
      templateUrl: 'templates/viernes.html',
      controller: 'ViernesCtrl',
      data: {
        access: AccessLevels.user
      }
    }).state('semestres',{
      url: '/semestres',
      templateUrl: 'templates/semestres.html',
      controller: 'SemestresCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('carreras',{
      url: '/carreras',
      templateUrl: 'templates/carreras.html',
      controller: 'CarrerasCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('actividades',{
      url: '/actividades',
      templateUrl: 'templates/actividades.html',
      controller: 'ActividadesCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('maestros',{
      url: '/maestros',
      templateUrl: 'templates/maestros.html',
      controller: 'MaestrosCtrl',
      data: {
        access: AccessLevels.admin
      }
    }).state('eventos',{
      url: '/eventos',
      templateUrl: 'templates/eventos.html',
      controller: 'EventosCtrl',
      data: {
        access: AccessLevels.admin
      }
    });
     $urlRouterProvider.otherwise('/');
  });
