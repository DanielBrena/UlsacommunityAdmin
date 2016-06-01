(function() {

    'use strict';
    app.controller('AlumnosCtrl', function($scope,CONFIG,$filter, $state,$stateParams,AlumnosFactory,MaestrosFactory,Notification,GruposFactory){
      $scope.id = $stateParams.id;

      $scope.alphabetcolors = ["#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];
      $scope.alumnosAgregados = [];
      $scope.grupo = {};
      $scope.asistencias = {};
      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();
      $('.parallax').parallax();

      function getMaestros(){
        MaestrosFactory.getMaestros().success(function(data){
          console.log(data);
          $scope.maestros = data;
        }).error(function(e){

        });
      }

      function getAlumnos(){
        setTimeout(function() {
          AlumnosFactory.getAlumnos($scope.id).success(function(data){
            console.info(data);
            $scope.grupo = data;
            $scope.titulo = data.name;
            if($scope.grupo.image){
              $scope.rutaImagen = CONFIG.APIURL + "images/grupos/" +$scope.grupo.image;

            }else{

              $scope.rutaImagen = CONFIG.APIURL + "images/grupos/portada_grupo.png";

            }
            console.log($scope.rutaImagen);
          }).error(function(e){

          });

          $scope.$apply();
        }, 1000);


      }

      getAlumnos();

      $scope.findAlumnoGrupo = function(search){
        if(search === ''){
          getAlumnos();
        }else{
          AlumnosFactory.findAlumnoGrupo($scope.id,search).success(function(data){
            $scope.grupo.students = data.students;

            console.info(data);
          }).error(function(e){

          });
        }

      }

      $scope.abrirModalAlumnos = function(){

        $scope.alumnosAgregados = [];
        $('#modal-alumnos').openModal();
      }

      $scope.abrirModalImagen = function(){
        $('#modal-imagen').openModal();
      }

      $scope.abrirModalMaestro = function(){
        $('#modal-maestro').openModal();
        getMaestros();
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

      $scope.asignarMaestro = function(g){
        console.log(g);
        console.log($scope.grupo.id + "  "+$scope.grupo.teacher.id);
        GruposFactory.addMaestro($scope.grupo.id,$scope.grupo.teacher.id).success(function(data){
          console.log(data);
          Notification.success("Maestro asignado");
        }).error(function(e){
          Notification.error("No se pudo asignar al maestro");
        });
      }
      $scope.agregarAsistencia = function(){
        var asistencia = {};

        asistencia.alumno = $scope.alumno.id;
        asistencia.grupo = $scope.id;
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

        });
        console.log(grupo);
      }


      $scope.agregarAsistencias = function(){
        $scope.asistencias.estudiantes = $scope.grupo.students;
        $scope.asistencias.grupo = $scope.id;

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
        $scope.asistencias.grupo = $scope.id;
        $scope.asistencias.fecha = $filter('date')($scope.asistencias.fecha,'yyyy-MM-dd');
        AlumnosFactory.deleteAsistencias($scope.asistencias).success(function(data){
          Notification.success('Asistencias eliminadas');
          console.log(data);
        }).error(function(e){
          Notification.error('No se pudo eliminar');
        });

      }

      $scope.obtenerAsistencias = function(a){
        console.log(a);
        console.log($scope.id);
        AlumnosFactory.getAsistencias(a.id,$scope.id).success(function(data){
          console.log(data);
          $scope.countAssistances = _.groupBy(data.assistances,function(data){
            console.log(data);
            if(data.type2 == 'asistencia'){
              return data.type;
            }

          });
          if($scope.countAssistances.true.length > 0){
            getCalificacion($scope.countAssistances.true.length);
          }else{
            $scope.countAssistances.true = [];
          }
          console.log($scope.countAssistances);
          data.assistances = _.sortBy(data.assistances,'date');
          console.log(data);
          $scope.asistenciasAlumno = data;
          console.log($scope.asistenciasAlumno);
        }).error(function(e){

        });
      }

      function getCalificacion(asistencias){
        AlumnosFactory.getCalificacion(asistencias).success(function(data){
          console.log(data);
          $scope.countAssistances.calificacion = data;
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
        alumnoGrupo.grupo = $scope.id;
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
        $scope.alumno = a;
        $("#modal-eliminar").openModal();
      }

      $scope.eliminarAlumno = function(){
        var alumno = {};
        alumno.estudiante = $scope.alumno.id;
        alumno.grupo = $scope.id;
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
