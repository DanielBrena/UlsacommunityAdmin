(function() {

    'use strict';
    app.controller('ViernesCtrl', function($scope,$filter,$window, $state,AlumnosFactory,ViernesFactory,Notification,Auth){
      $scope.alphabetcolorsHombre = ["#90caf9"];
      $scope.alphabetcolorsMujer = ["#f48fb1"];
      $scope.alumno = {};
      $scope.alumno.groups = {};

      $scope.cerrarSesion = function(){
        Auth.logout();
      }


      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();
      $('select').material_select();


      $scope.searchAlumno = function(query){
        if(query != ''){
          $scope.alumno = null;
          AlumnosFactory.findAlumno(query).success(function(data){
            console.log(data);
            $scope.alumnos = data.students;
          }).error(function(e){

          });
        }else{
          $scope.alumnos = null;
        }
      }

      $scope.enviarAsistencia = function(a){
        console.log(a);
        console.log($scope.grupoSeleccionado);
        ViernesFactory.createAsistencia(a.id,$scope.grupoSeleccionado.id).success(function(data){
           Notification.success(data.message);
           $scope.query = null;
           $scope.alumno = null;
           $scope.alumnos = null;
           document.getElementById("query").focus();
        }).error(function(e){
          Notification.error(e.errors[0].message);
        });
      }


      $scope.detalleAlumno = function(a){

          $scope.alumno = a;
          $scope.alumno.name = a.name;
          $scope.alumno.gender = a.gender;
          $scope.grupoSeleccionado = a.groups[0];
          console.log(a.groups[0]);

        console.log(a);

      }

      $scope.abrirModal = function(){
        $('#modal1').openModal();
        ViernesFactory.getAsistencias().success(function(data){
          //console.log(data);
          var fechas = _.groupBy(data,'date');
          console.log(fechas);
          $scope.fechas = [];
          var arreglo = _.each(fechas,function(key,val,list){
            var f = {};
            f.name = $filter('date')(val,'yyyy-MMMM-dd')
            f.value = val;
            $scope.fechas.push(f);
          })
          $scope.fecha = $scope.fechas[0];
          $scope.generarLink($scope.fecha);
        }).error(function(e){

        })
      }

      $scope.generarLink = function(f){
        console.log(f);
        $scope.ruta = ViernesFactory.getReporte(f.value);
        // ViernesFactory.getReporte($scope.fecha.value).success(function(data){
        //   Notification.success("Reporte generado");
        //
        // }).error(function(e){
        //   Notification.error("No se pudo generar el reporte");
        //
        // });
      }

      $scope.generarReporte = function(){
        console.log($scope.ruta);
        $window.location.href = $scope.ruta;
      }





    });



})();
