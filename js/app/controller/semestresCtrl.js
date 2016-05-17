(function() {

    'use strict';
    app.controller('SemestresCtrl', function($scope, $state,SemestresFactory,Notification){
      $scope.semestre = {};
      $scope.semestre.active = false;

      $scope.enviarFormulario = function(s){


        $scope.semestre = s;

      }

      $scope.actualizarSemestre = function(s){
        console.log(s);
        SemestresFactory.updateSemestre(s).success(function(data){
          Notification.success('Semestre actualizado');
          console.log(data);
          getSemestres();
        }).error(function(e){
          Notification.error('No se puede actualizar el semestre, tal vez ya no exista.');
        });

      }

      $scope.crearSemestre = function(s){
        console.log(s)
        SemestresFactory.createSemestre(s).success(function(data){
          Notification.success('Semestre creado');
          console.log(data);
          getSemestres();
        }).error(function(e){
          Notification.error('Lo sentimos, hubo un error al crear el semestre.');
        });
      }

      $scope.eliminarSemestre = function(){
        SemestresFactory.deleteSemestre($scope.semestre.id).success(function(data){
          Notification.success('Semestre elimado');
          console.log(data);
          getSemestres();
          $('#modal1').closeModal();
        }).error(function(e){
          Notification.error('No se puede eliminar el semestre, tal vez ya se elimino.');
        });
      }

      $scope.alphabetcolors = ["#e91e63","#9c27b0"];
      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();
      $('.semestre-btn-modal').leanModal();


      function fecha(){
        var currentTime = new Date();
        $scope.semestre.date = currentTime;
        $scope.month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        $scope.monthShort = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        $scope.weekdaysFull = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
        $scope.weekdaysLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
        $scope.disable = [false, 1, 7];
        $scope.today = 'Hoy';
        $scope.clear = 'Limpiar';
        $scope.close = 'Cerrar';
        var days = 15;

      }
      fecha();

      function getSemestres(){
        SemestresFactory.getSemestres().success(function(data){
          $scope.semestres = data;
          console.log(data);
        }).error(function(e){

        });
      }

      getSemestres();






    });



})();
