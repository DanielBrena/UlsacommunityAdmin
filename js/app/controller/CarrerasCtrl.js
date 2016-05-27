(function() {
    'use strict';
    app.controller('CarrerasCtrl', function($scope, $state,CarrerasFactory,Notification){
      $scope.carrera = {};

      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();

      function obtenerCarreras(){
        CarrerasFactory.getCarreras().success(function(data){
          $scope.carreras = data;
        }).error(function(e){

        });
      }

      $scope.enviarFormulario = function(e){
        $scope.carrera = e;
      }

      $scope.actualizarCarrera = function(c){
        CarrerasFactory.updateCarrera(c).success(function(data){
          Notification.success("Carrera actualizada");
          obtenerCarreras();
        }).error(function(e){
          Notification.error("No se pudo actualizar la carrera");
        });
      }
      $scope.crearCarrera = function(c){
        CarrerasFactory.createCarrera(c).success(function(data){
          Notification.success("Carrera creada");
          obtenerCarreras();
        }).error(function(e){
          Notification.error("No se pudo crear la carrera");
        });
      }

      $scope.eliminarCarrera = function(){
        CarrerasFactory.deleteCarrera($scope.carrera.id).success(function(data){
          Notification.success("Carrera eliminada");
          obtenerCarreras();
        }).error(function(e){
          Notification.error("No se pudo eliminar la carrera");
        })
      }

      $scope.mostrarModalEliminar = function(){
        $('#modalEliminarCarrera').openModal();
      }

      obtenerCarreras();

    });
})();
