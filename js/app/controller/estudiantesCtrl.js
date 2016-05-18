(function() {

    'use strict';
    app.controller('EstudiantesCtrl', function($scope, $state,Notification,AlumnosFactory){
      $scope.estudiante = {};

      $scope.abrirModalGrupo = function(g){
        $('#modal-alumno').openModal();

      }

      $scope.crearEstudiante = function(e){
        console.log(e);
        AlumnosFactory.createAlumno(e).success(function(data){
          Notification.success("Alumno creado");
          console.log(data);
        }).error(function(e){
          Notification.error("Error, alumno no creado");
        });
      }

      $scope.searchAlumno = function(query){
        if(query != ''){
          $scope.estudiante = null;
          AlumnosFactory.findAlumno(query).success(function(data){
            console.log(data);
            $scope.estudiantes = data.students;
          }).error(function(e){

          });
        }else{
          $scope.estudiantes = null;
        }
      }
    });



})();
