var app = angular.module('ulsa',['ui.router','ulsa.routes','ngSanitize','ui.materialize','ngLetterAvatar','ui-notification']);
app.constant('CONFIG',
  {
  "APIURL":"http://192.168.1.109:1337/"
  }
).run(function($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

  });
})
