(function() {

    'use strict';
    app.controller('EstudiantesCtrl', function($scope, $state,Notification,AlumnosFactory,CarrerasFactory){
      $scope.alumno = {};
      $scope.usuario = {};


      $scope.abrirModalAlumno = function(e){
        $('#modal-alumno').openModal();
        $scope.alumno = e;

        cargarCarreras()
      }

      $scope.abrirModalCuenta = function(u){
        $('#modal-cuenta').openModal();
        console.log('abrir');
        $scope.alumno = u;
        console.log(u);
        console.log(u.user.id);
        if(u.user.id){
          $scope.usuario = u.user;
        }
      //  $scope.usuario = u;
      }

      $scope.actualizarUsuario = function(u){
        console.log(u);
      }
      $scope.crearUsuario = function(u){
        u.student = $scope.alumno.id;
        AlumnosFactory.createUserAlumno(u).success(function(data){
          console.log(data);
          Notification.success('Usuario creado');
          $scope.usuario = {};
          $('#modal-cuenta').closeModal();
        }).error(function(data){
          Notification.error('Usuario no creado');
        })
      }

      $scope.abrirModalGrupos = function(grupos){
          $('#modal-grupos').openModal();
          $scope.grupos = grupos;
      }

      function cargarCarreras(){
        CarrerasFactory.getCarreras().success(function(data){
          console.log(data);
          $scope.carreras = data;
        }).error(function(e){
          console.log(e);
        });
      }

      $scope.crearEstudiante = function(e){
        console.log(e);
        AlumnosFactory.createAlumno(e).success(function(data){
          Notification.success("Alumno creado");
          console.log(data);
        }).error(function(e){
          Notification.error("Error, alumno no creado");
        });
      }


      $scope.editarEstudiante = function(e){
        console.log(e);
        AlumnosFactory.updateAlumno(e).success(function(data){
          Notification.success("Alumno actualizado");
        }).error(function(e){
          Notification.error("No se pudo actualizar el alumno");
        });
      }



      $scope.searchAlumno = function(query){
        if(query != ''){
          //$scope.estudiante = null;
          AlumnosFactory.findAlumno(query).success(function(data){
            console.log(data);
            $scope.estudiantes = data.students;
          }).error(function(e){

          });
        }else{
          $scope.estudiantes = null;
        }
      }
      $(".button-collapse").sideNav();
      $('.button-collapse').sideNav('hide');

      $('.button-collapse').sideNav({
        closeOnClick: true
      })

    });





})();
