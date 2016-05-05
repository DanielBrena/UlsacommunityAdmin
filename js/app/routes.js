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
    }).state('maestros',{
      url: '/maestros',
      templateUrl: 'templates/maestros.html',
      controller: 'MaestrosCtrl',
      data: {
        access: AccessLevels.admin
      }
    });
     $urlRouterProvider.otherwise('/');
  });
