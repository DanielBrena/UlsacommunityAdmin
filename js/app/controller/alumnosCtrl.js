(function() {

    'use strict';
    app.controller('AlumnosCtrl', function($scope,$filter, $state,$stateParams,AlumnosFactory,Notification){
      $scope.id = $stateParams.id;
      $scope.alphabetcolors = ["#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];
      $scope.alumnosAgregados = [];

      $scope.asistencias = {};

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

      $scope.abrirModalAlumnos = function(){
        $('#modal-alumnos').openModal();
        $scope.alumnosAgregados = [];
      }

      $scope.abrirModalAsistencias = function(){
        $("#modal-asistencias").openModal();
      }

      function fecha(){
        var currentTime = new Date();
        $scope.asistencias.fecha = currentTime;
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

      $scope.agregarAsistencias = function(){
        $scope.asistencias.estudiantes = $scope.grupo.students;
        $scope.asistencias.grupo = $scope.grupo.id;

        for(var i = 0; i < $scope.asistencias.estudiantes.length; i++){
          $scope.asistencias.estudiantes[i].assistance = $scope.asistencias.type;
        }
        delete $scope.asistencias.type;
        console.log($scope.asistencias);
        $scope.asistencias.estudiantes = JSON.stringify($scope.asistencias.estudiantes);
        $scope.asistencias.fecha = $filter('date')($scope.asistencias.fecha,'yyyy-MMMM-dd');
        AlumnosFactory.sendAsistencias($scope.asistencias).success(function(data){
          console.log(data);
           Notification.success('Asistencia Actualizada');
        }).error(function(e){
           Notification.error('No se pudo actualizar');
        });
      }

      $scope.obtenerAsistencias = function(a){
        AlumnosFactory.getAsistencias(a.id,$scope.grupo.id).success(function(data){
          console.log(data);
          $scope.asistenciasAlumno = data;
        }).error(function(e){

        });
      }

      $scope.cambiarAsistencia = function(a){

        console.log(a);
        AlumnosFactory.updataAsistencia(a).success(function(data){
          Notification.success("Asistencia actualizada");
        }).error(function(e){
          Notification.success("No se pudo actualizar la asistencia");
        });

      }

      $scope.agregarAlumnos = function(a){
        var busqueda = _.find($scope.alumnosAgregados,function(val){
          return a.id === val.id;
        });
        console.log(busqueda);
        if(busqueda === undefined){
          $scope.alumnosAgregados.push(a);
        }

      }

      $scope.quitarAlumno = function(alumno){
        $scope.alumnosAgregados = _.without($scope.alumnosAgregados,alumno);

      }

      $scope.searchAllAlumnos = function(query){
        if(query != ''){
          $scope.alumno = null;
          AlumnosFactory.findAlumno(query).success(function(data){
            console.log(data);
            $scope.alumnosAll = data.students;
          }).error(function(e){

          });
        }else{
          $scope.alumnos = null;
        }
      }






    });



})();
