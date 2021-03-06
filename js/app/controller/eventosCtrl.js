(function() {

  'use strict';
  app.controller('EventosCtrl', function($scope,Notification,EventosFactory,GruposFactory,$filter){
    $scope.alumno = {};
    $scope.evento = {};

    $('#timepicker_default1').pickatime({
      default: 'now',
      donetext: 'Guardar',
      autoclose: true,
      twelvehour: false
    });
    $('#timepicker_default2').pickatime({
      default: 'now',
      donetext: 'Guardar',
      autoclose: true,
      twelvehour: false
    });

    $scope.abrirModalEventos = function(g){
      $('#modal-evento').openModal();
      obtenerGrupos();


    }

    $scope.generarHora = function(e){
      if(e.type == 'evento'){
        $scope.evento.horaInicio  = null;
        $scope.evento.horaTermino  = null;
      }else{
        $scope.evento.horaInicio  = new Date();
        var horaTermino = new Date();
        horaTermino.setHours(horaTermino.getHours() +1);
        $scope.evento.horaTermino  = horaTermino;
      }

    }

    function obtenerGrupos(){
      GruposFactory.getGruposActivos().success(function(data){

        $scope.grupos = data;
        console.log(data);
      }).error(function(e){

      });
    }

    $scope.eliminarEvento = function(e){
      EventosFactory.deleteEvento(e.id).success(function(data){
        Notification.success("Evento eliminado");

        obtenerEventos();
      }).error(function(e){
        Notification.error("No se pudo eliminar el evento");
      })
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
      //$scope.disable = [false, 1, 7];
      $scope.today = 'Hoy';
      $scope.clear = 'Limpiar';
      $scope.close = 'Cerrar';
      var days = 15;

    }
    fecha();



    obtenerEventos();

    $scope.eliminarGrupo = function(e){
      delete e.group;
    }

    $scope.crearEvento = function(e){
      var horaInicio = new Date(e.date);
      horaInicio.setHours(e.horaInicio.getHours());
      horaInicio.setMinutes(e.horaInicio.getMinutes());

      var horaTermino = new Date(e.date);
      horaTermino.setHours(e.horaTermino.getHours());
      horaTermino.setMinutes(e.horaTermino.getMinutes());
      e.dateStart = horaInicio;
      e.dateEnd = horaTermino;

      EventosFactory.setEvento(e).success(function(d){
        Notification.success("Se agrego un evento");

        $scope.evento = {};
        obtenerGrupos();
        fecha();
        $scope.evento.type= 'evento';
        $scope.evento.diffusion = 'todos';
      }).error(function(e){
        Notification.error("No se pudo agregar el evento");
      });

    }

    $scope.seleccionarArchivo = function(e){
      $scope.$apply(function($scope) {
        $scope.file = e.files;
      });
      console.log($scope.file);
    }


    $(".button-collapse").sideNav();
    $('.button-collapse').sideNav('hide');

    $('.button-collapse').sideNav({
      closeOnClick: true
    })



  });





})();
