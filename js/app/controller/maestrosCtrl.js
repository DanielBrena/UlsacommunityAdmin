(function() {

    'use strict';
    app.controller('MaestrosCtrl', function($scope, $state,MaestrosFactory,Notification){
      $scope.maestro = {};
        $scope.usuario = {};

      $scope.alphabetcolors = ["#ff1744","#f50057","#d500f9","#651fff","#3d5afe","#2979ff"];//,"#1de9b6","#00b0ff","#00e5ff","#00e676","#76ff03","#c6ff00","#f9a825","#ff8f00","#ef6c00"];
      $('.button-collapse').sideNav('hide');
      $(".button-collapse").sideNav();
      //$('.maestros-btn-modal').leanModal();

      $scope.abrirModal = function(g){
        $scope.grupos = g;
        console.log(g);
          $('#modal-grupos').openModal();
      }

      $scope.abrirModalCuenta = function(u){
        $('#modal-cuenta').openModal();
        $scope.usuario = u;
        // $scope.usuario.id = u.id;
        // $scope.password = null;
        // $scope.usuario.username = u.username;
        // $scope.usuario.email = u.email;
        // $scope.usuario.active = u.active;
      }
      $scope.actualizarUsuario = function(u){

        // if(p != null){
        //   u.encryptedPassword = p;
        // }
        console.log(u);
        MaestrosFactory.updateUsuario(u).success(function(data){
         Notification.success('Usuario actualizado');
        }).error(function(e){
           Notification.error('No se pudo actualizar');
        });
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

      // $scope.actualizarSemestre = function(s){
      //   console.log(s);
      //   SemestresFactory.updateSemestre(s).success(function(data){
      //     Notification.success('Semestre actualizado');
      //     console.log(data);
      //     getSemestres();
      //   }).error(function(e){
      //     Notification.error('No se puede actualizar el semestre, tal vez ya no exista.');
      //   });
      //
      // }
      //
      // $scope.crearSemestre = function(s){
      //   console.log(s)
      //   SemestresFactory.createSemestre(s).success(function(data){
      //     Notification.success('Semestre creado');
      //     console.log(data);
      //     getSemestres();
      //   }).error(function(e){
      //     Notification.error('Lo sentimos, hubo un error al crear el semestre.');
      //   });
      // }
      //
      // $scope.eliminarSemestre = function(){
      //   SemestresFactory.deleteSemestre($scope.semestre.id).success(function(data){
      //     Notification.success('Semestre elimado');
      //     console.log(data);
      //     getSemestres();
      //     $('#modal1').closeModal();
      //   }).error(function(e){
      //     Notification.error('No se puede eliminar el semestre, tal vez ya se elimino.');
      //   });
      // }








    });



})();
