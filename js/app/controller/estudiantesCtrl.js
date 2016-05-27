(function() {

    'use strict';
    app.controller('EstudiantesCtrl', function($scope, $state,Notification,AlumnosFactory,CarrerasFactory){
      $scope.alumno = {};

      $scope.abrirModalAlumno = function(e){
        $('#modal-alumno').openModal();
        $scope.alumno = e;

        cargarCarreras()
      }

      $scope.abrirModalGrupos = function(grupos){
          $('#modal-grupos').openModal();
          $scope.grupos = grupos;
      }

      function cargarCarreras(){
        CarrerasFactory.getCarreras().success(function(data){
          console.log(data);
          $scope.carreras = data;
        }).error(function(e){
          console.log(e);
        });
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


      $scope.editarEstudiante = function(e){
        console.log(e);
        AlumnosFactory.updateAlumno(e).success(function(data){
          Notification.success("Alumno actualizado");
        }).error(function(e){
          Notification.error("No se pudo actualizar el alumno");
        });
      }



      $scope.searchAlumno = function(query){
        if(query != ''){
          //$scope.estudiante = null;
          AlumnosFactory.findAlumno(query).success(function(data){
            console.log(data);
            $scope.estudiantes = data.students;
          }).error(function(e){

          });
        }else{
          $scope.estudiantes = null;
        }
      }
      $(".button-collapse").sideNav();
      $('.button-collapse').sideNav('hide');

      $('.button-collapse').sideNav({
        closeOnClick: true
      })

    });





})();
