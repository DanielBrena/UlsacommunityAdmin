(function() {
  'use strict';
  app.controller('ActividadesCtrl', function($scope, $state,ActividadesFactory,Notification){
    $scope.actividad = {};

    $('.button-collapse').sideNav('hide');
    $(".button-collapse").sideNav();

    function obtenerActvidades(){
      ActividadesFactory.getActividades().success(function(data){
        $scope.actividades = data;
      }).error(function(e){

      });
    }

    $scope.enviarFormulario = function(a){
      $scope.actividad = a;
    }

    $scope.actualizarActividad = function(c){
      ActividadesFactory.updateActividad(c).success(function(data){
        Notification.success("Actividad actualizada");
        obtenerActvidades();
      }).error(function(e){
        Notification.error("No se pudo actualizar la actividad");
      });
    }
    $scope.crearActividad = function(c){
      ActividadesFactory.createActividad(c).success(function(data){
        Notification.success("Actividad creada");
        obtenerActvidades();
      }).error(function(e){
        Notification.error("No se pudo crear la actividad");
      });
    }

    $scope.eliminarActividad = function(){
      ActividadesFactory.deleteActividad($scope.actividad.id).success(function(data){
        Notification.success("Actividad eliminada");
        obtenerActvidades();
      }).error(function(e){
        Notification.error("No se pudo eliminar la actividad");
      })
    }

    $scope.mostrarModalEliminar = function(){
      $('#modalEliminarActividad').openModal();
    }

    obtenerActvidades();

  });
})();
