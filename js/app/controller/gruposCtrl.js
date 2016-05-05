(function() {

    'use strict';
    app.controller('GruposCtrl', function($scope, $state,GruposFactory){
      $scope.alphabetcolors = ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff"];//,"#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];

      function getAllGrupos(){
        GruposFactory.getAllGrupos().success(function(data){
          console.log(data);
          $scope.grupos = data;
        }).error(function(e){

        });
      }

      getAllGrupos();

        $(".button-collapse").sideNav();
         $('.button-collapse').sideNav('hide');




    




    });



})();
