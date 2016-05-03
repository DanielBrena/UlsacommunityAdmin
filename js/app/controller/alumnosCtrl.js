(function() {

    'use strict';
    app.controller('AlumnosCtrl', function($scope, $state,$stateParams,AlumnosFactory){
      $scope.id = $stateParams.id;
      $scope.alphabetcolors = ["#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];


      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();

      function getAlumnos(){
        AlumnosFactory.getAlumnos($scope.id).success(function(data){
          console.log(data);
          $scope.grupo = data;
          $scope.titulo = data.name;
          //$scope.alumnos = data.students;
        }).error(function(e){

        });
      }

      getAlumnos();






    });



})();
