(function() {

    'use strict';
    app.controller('MaestrosCtrl', function($scope, $state,MaestrosFactory,Notification){
      $scope.maestro = {};
      $scope.usuario = {};

      $scope.alphabetcolors = ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff"];//,"#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];
      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();

      $scope.abrirModal = function(g){
        $scope.grupos = g;
        console.log(g);
          $('#modal-grupos').openModal();
      }

      $scope.abrirModalMaestro = function(m){
        $scope.maestro = m;
        $('#modal-maestro').openModal();
      }

      $scope.abrirModalCuenta = function(m){
        $scope.usuario = {};
        $('#modal-cuenta').openModal();
        console.log(m.user);
        $scope.maestro = m;
        if(m.user === undefined){
          $scope.usuario = {};
        }else{
          $scope.usuario = m.user;
        }

      }

      $scope.abrirModalEliminar = function(m){
          $scope.maestro = m;
          $('#modal-eliminar').openModal();

      }

      $scope.eliminarMaestro = function(){
        MaestrosFactory.deleteMaestro($scope.maestro.id).success(function(data){
          Notification.success("Maestro eliminado");
          getMaestros();
        }).error(function(e){
          Notification.error("No se pudo eliminar al maestro");
        });
      }

      $scope.actualizarUsuario = function(u){


        console.log(u);
        MaestrosFactory.updateUsuario(u).success(function(data){
         Notification.success('Usuario actualizado');
        }).error(function(e){
           Notification.error('No se pudo actualizar');
        });
      }

      $scope.crearUsuario = function(u){
        u.teacher = $scope.maestro.id;
        MaestrosFactory.createUsuario(u).success(function(data){
          Notification.success("Usuario creado");
          getMaestros();
        }).error(function(e){
          Notification.error("No se pudo crear el usuario");
        })
        console.log(u);
      }

      $scope.buscarMaestro = function(query){
        if(query === ''){
          getMaestros();
        }else{
          MaestrosFactory.searchMaestro(query).success(function(data){
            console.log(data);
            $scope.maestros = data;
          }).error(function(e){

          });
        }

      }



      $scope.enviarFormulario = function(s){

        $scope.semestre = s;

      }

      function getMaestros(){
        MaestrosFactory.getMaestros().success(function(data){
          $scope.maestros = data;
          console.log(data);
        }).error(function(e){

        });
      }

      getMaestros();

      $scope.crearMaestro = function(m){
        MaestrosFactory.createMaestro(m).success(function(data){
          Notification.success("Maestro creado");
          getMaestros();
        }).error(function(e){
          Notification.error("No se pudo crear un maestro");
        });
      }

      $scope.actualizarMaestro = function(m){
        MaestrosFactory.updateMaestro(m).success(function(data){
          Notification.success("Maestro actualizado");
          getMaestros();
        }).error(function(e){
          Notification.error("No se pudo actualizar al maestro");
        });
      }


    });



})();
