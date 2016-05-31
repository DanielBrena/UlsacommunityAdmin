(function() {

    'use strict';
    app.controller('GruposCtrl', function($scope,CONFIG,$state,GruposFactory,ActividadesFactory,SemestresFactory,Notification){
      $scope.grupo = {};
      $scope.ruta = CONFIG.APIURL;
      $scope.alphabetcolors = ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff"];//,"#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];

      function getGrupos(){
        GruposFactory.getGruposActivos().success(function(data){
          console.log(data);
          $scope.grupos = data;
        }).error(function(e){

        });
      }

      $scope.findGrupos = function(query){
        var q = {};
        q.query = query;
        if(query == ''){
          getGrupos();
        }else{
          GruposFactory.findGrupos(q).success(function(data){
            console.log(data);
            $scope.grupos = data;
          }).error(function(e){

          })
        }

      }

      function getActividades(){
        ActividadesFactory.getActividades().success(function(data){
          $scope.actividades = data;
        }).error(function(e){

        });
      }

      function getSemestres(){
        SemestresFactory.getSemestres().success(function(data){
          $scope.semestres = data;
        }).error(function(e){

        });
      }

      $scope.actualizarGrupo = function(g){

        console.log(g);
        GruposFactory.updateGrupo(g).success(function(data){
          Notification.success("Grupo actualizado");
        }).error(function(e){
          Notification.error("El grupo no se actualizó");
        });
      }

      $scope.crearGrupo = function(g){
        console.log(g);
        GruposFactory.createGrupo(g).success(function(data){
          Notification.success("Grupo creado");
          getGrupos();
        }).error(function(e){
          Notification.error("Existe un error, el grupo no se creo");
        });
      }

      $scope.abrirModalGrupoEliminar = function(id){
          $('#modal-grupo-eliminar').openModal();
          $scope.grupo.id = id;
      }

      $scope.eliminarGrupo = function(){
        GruposFactory.deleteGrupo($scope.grupo.id).success(function(data){
          getGrupos();
          $('#modal-grupo-eliminar').closeModal();

          Notification.success("Se elimino el grupo");

        }).error(function(e){
          Notification.error("Hubo un error, no se elimino el grupo");
        });
      }



      $scope.abrirModalGrupo = function(g){
        $('#modal-grupo').openModal();

        getActividades();
        getSemestres();

        console.log(g);
        $scope.grupo = g;

      }

      getGrupos();

        $(".button-collapse").sideNav();
         $('.button-collapse').sideNav('hide');









    });



})();
