(function() {

    'use strict';
    app.controller('PrincipalCtrl', function($scope,$filter, $state,AlumnosFactory,ViernesFactory,MaestrosFactory,GruposFactory){
      $scope.viernes = {};
      $scope.total = [];
      $scope.fechas = [];
      $scope.series = ['Viernes culturales'];

      function getAllAlumnos(){
        AlumnosFactory.getAllAlumnos().success(function(data){
          console.log(data);
          $scope.alumnos = data;
        }).error(function(e){

        });
      }
      function getAllMaestros(){
        MaestrosFactory.getAllMaestros().success(function(data){
          console.log(data);
          $scope.maestros = data;
        }).error(function(e){

        });
      }
      function getAllViernes(){
        ViernesFactory.getAllViernes().success(function(data){
          console.log(data);
          $scope.viernes = data;
        }).error(function(e){

        });
      }
      function getAllGrupos(){
        GruposFactory.getAllGrupos().success(function(data){
          console.log(data);
          $scope.grupos = data;
        }).error(function(e){

        });
      }

      function estadisticasViernes(){

        ViernesFactory.getAsistencias().success(function(data){
          //console.log(data);
          var fechas = _.groupBy(data,'date');
          console.log(fechas);

            var total = [];
          var arreglo = _.each(fechas,function(key,val,list){
            total.push(key.length);

            var name = $filter('date')(val,'yyyy-MMMM-dd');

            $scope.fechas.push(name);
          });
          //$scope.viernes.fecha = fechas;
          $scope.total.push(total);

          console.log($scope.total);
          console.log($scope.fechas);
          console.log($scope.series);
        }).error(function(e){

        })
      }
      estadisticasViernes();

      getAllAlumnos();
      getAllMaestros();
      getAllViernes();
      getAllGrupos();


      $(".button-collapse").sideNav();
      $('.button-collapse').sideNav('hide');

      $('.button-collapse').sideNav({ // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );




    });



})();
