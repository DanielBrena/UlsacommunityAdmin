(function() {

    'use strict';
    app.controller('LoginCtrl', function($scope, $state,Auth,Notification,CurrentUser){
      if(CurrentUser.user()){
        $state.go('principal');
      }

      $scope.login = function(u){
        console.log(u);
        Auth.login(u).success(function(data){
          $state.go('principal');
        }).error(function(e){
          Notification.error('Usuario incorrecto.');

        });

      }

    });



})();
