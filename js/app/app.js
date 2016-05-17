var app = angular.module('ulsa',['ui.router','ulsa.routes','ngSanitize','ui.materialize','ngLetterAvatar','ui-notification','chart.js']);
app.constant('CONFIG',
  {
  "APIURL":"http://localhost:1337/"
  }
).run(function($rootScope, $state, Auth) {

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!Auth.authorize(toState.data.access)) {
      event.preventDefault();

      $state.go('login');
    }
  });
})
