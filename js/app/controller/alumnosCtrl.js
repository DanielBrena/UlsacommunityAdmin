(function() {

    'use strict';
    app.controller('AlumnosCtrl', function($scope,CONFIG,$filter, $state,$stateParams,AlumnosFactory,Notification,GruposFactory){
      $scope.id = $stateParams.id;

      $scope.alphabetcolors = ["#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];
      $scope.alumnosAgregados = [];
      $scope.grupo = {};
      $scope.asistencias = {};
      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();
      $('.parallax').parallax();


      function getAlumnos(){
        setTimeout(function() {
          AlumnosFactory.getAlumnos($scope.id).success(function(data){
            console.log(data);
            $scope.grupo = data;
            $scope.titulo = data.name;
            if($scope.grupo.image){
              $scope.rutaImagen = CONFIG.APIURL + "images/grupos/" +$scope.grupo.image;

            }else{

              $scope.rutaImagen = CONFIG.APIURL + "images/grupos/portada_grupo.png";

            }
            console.log($scope.rutaImagen);
            //$scope.alumnos = data.students;
          }).error(function(e){

          });

          $scope.$apply();
        }, 1000);


      }

      getAlumnos();

      $scope.abrirModalAlumnos = function(){

        $scope.alumnosAgregados = [];
        $('#modal-alumnos').openModal();
      }

      $scope.abrirModalImagen = function(){
        $('#modal-imagen').openModal();
      }
      $scope.abrirModalAsistencias = function(){
        $scope.alumno = null;
        $("#modal-asistencias").openModal();
      }

      function fecha(){
        var currentTime = new Date().toISOString();
        $scope.asistencias.fecha = currentTime;
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

      $scope.agregarAsistenciaModal = function(a){

        $("#modal-asistencias").openModal();
        $scope.alumno = a;



      }
      $scope.agregarAsistencia = function(){
        var asistencia = {};

        asistencia.alumno = $scope.alumno.id;
        asistencia.grupo = $scope.grupo.id;
        asistencia.asistenciabool = $scope.asistencias.type;
        asistencia.asistenciastring = $scope.asistencias.type2;
        asistencia.fecha = $scope.asistencias.fecha;


         console.log(new Date($scope.asistencias.fecha));
        //asistencia.fecha = new Date($scope.asistencias.fecha).setHours(5);
         //console.log(asistencia);

         asistencia.fecha = $filter('date')(asistencia.fecha,'yyyy-MM-dd');
         console.log(asistencia);
        AlumnosFactory.sendAsistencia(asistencia).success(function(data){
          console.log(asistencia);
          Notification.success("Asistencia agregada");
        }).error(function(e){
          Notification.error("No se pudo agregar la asistencia.")
        });

      }

      $scope.agregarImagen = function(imagen){
        var grupo = {};
        grupo.grupo = $scope.id;
        grupo.file = imagen;
        GruposFactory.uploadImagen(grupo).success(function(data){
          Notification.success("La imagen se ha subido satisfactoriamente");
          getAlumnos();
        }).error(function(e){

        })



        console.log(grupo);
      }

      $scope.agregarAsistencias = function(){
        $scope.asistencias.estudiantes = $scope.grupo.students;
        $scope.asistencias.grupo = $scope.grupo.id;

        for(var i = 0; i < $scope.asistencias.estudiantes.length; i++){
          $scope.asistencias.estudiantes[i].assistance = $scope.asistencias.type;
        }
        delete $scope.asistencias.type;
        console.log($scope.asistencias);
        $scope.asistencias.estudiantes = JSON.stringify($scope.asistencias.estudiantes);
        $scope.asistencias.fecha = $filter('date')($scope.asistencias.fecha,'yyyy-MM-dd');

        AlumnosFactory.sendAsistencias($scope.asistencias).success(function(data){
          console.log(data);
           Notification.success('Asistencia Actualizada');
        }).error(function(e){
           Notification.error('No se pudo actualizar');
        });
      }

      $scope.eliminarAsistencias = function(){
        $scope.asistencias.grupo = $scope.grupo.id;
        $scope.asistencias.fecha = $filter('date')($scope.asistencias.fecha,'yyyy-MM-dd');
        AlumnosFactory.deleteAsistencias($scope.asistencias).success(function(data){
          Notification.success('Asistencias eliminadas');
          console.log(data);
        }).error(function(e){
          Notification.error('No se pudo eliminar');
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

        if(busqueda === undefined){
          $scope.alumnosAgregados.push(a);
          console.log(a);
        }

      }

      $scope.agregarAlumnosGrupo = function(){
        console.log($scope.alumnosAgregados);
        var alumnoGrupo = {};
        alumnoGrupo.estudiantes = JSON.stringify($scope.alumnosAgregados);
        alumnoGrupo.grupo = $scope.grupo.id;
        console.log(alumnoGrupo);
        AlumnosFactory.addAlumnos(alumnoGrupo).success(function(data){
          Notification.success(data.message);
          getAlumnos();
        }).error(function(e){
          Notification.error("Error, no se agregaron los alumnos");
        });
      }

      $scope.removerAlumno = function(a){
        console.log(a);
        var alumno = {};
        alumno.estudiante = a;
        alumno.grupo = $scope.grupo.id;
        console.log(alumno);
        AlumnosFactory.removeAlumno(alumno).success(function(data){
          console.log(data);
          Notification.success(data.message);
          getAlumnos();
        }).error(function(e){
          Notification.error("Error, no se pudo remover el alumno");
        });
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
