var app = angular.module('ulsa',['ui.router','ulsa.routes','ngSanitize','ui.materialize','ngLetterAvatar','ui-notification']);
app.constant('CONFIG',
  {
  "APIURL":"http://172.16.12.10:1337/"
  }
).run(function($rootScope, $state) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

  });
})
