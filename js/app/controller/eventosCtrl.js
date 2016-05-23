(function() {

    'use strict';
    app.controller('EventosCtrl', function($scope,Notification,EventosFactory){
      $scope.alumno = {};
      $scope.evento = {};

      $('#timepicker_default1').pickatime({
      default: 'now',
      donetext: 'Guardar',
      autoclose: true
      });
      $('#timepicker_default2').pickatime({
      default: 'now',
      donetext: 'Guardar',
      autoclose: true
      });

      $scope.abrirModalEventos = function(g){
        $('#modal-evento').openModal();

      }

      function obtenerEventos(){
        EventosFactory.getEventos().success(function(data){
          $scope.eventos = data;
          console.log(data);
        }).error(function(e){

        })
      }

      function fecha(){
        var currentTime = new Date();
        $scope.evento.date = currentTime;
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

      obtenerEventos();

      $scope.crearEvento = function(e){
        console.log(e);
      }


      $(".button-collapse").sideNav();
      $('.button-collapse').sideNav('hide');

      $('.button-collapse').sideNav({
        closeOnClick: true
      })



    });





})();
