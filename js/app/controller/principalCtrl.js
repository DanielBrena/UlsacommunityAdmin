(function() {

    'use strict';
    app.controller('PrincipalCtrl', function($scope, $state){



      $(".button-collapse").sideNav();
      $('.button-collapse').sideNav('hide');

      $('.button-collapse').sideNav({ // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );




    });



})();
