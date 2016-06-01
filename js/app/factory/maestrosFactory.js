(function() {
    'use strict';
    app.factory('MaestrosFactory', function(CONFIG,$http){
      return{
        searchMaestro:function(query){
          var resultado = $http.post(CONFIG.APIURL + "teachers/findByQuery",{search:query});
          return resultado;
        },
        getAllMaestros:function(){
          var resultado = $http.get(CONFIG.APIURL + "statistics/allTeachers");
          return resultado;
        },
        getMaestros:function(){
          var resultado = $http.get(CONFIG.APIURL + "teachers");
          return resultado;
        },
        updateUsuario:function(user){
          var resultado = $http.put(CONFIG.APIURL + "users/" +user.id,user);
          return resultado;
        },
        createUsuario:function(user){
          var resultado = $http.put(CONFIG.APIURL + "users/createTeacher",user);
          return resultado;
        },
        createMaestro:function(teacher){
          var resultado = $http.post(CONFIG.APIURL + "teachers",teacher);
          return resultado;
        },
        deleteMaestro:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "teachers/"+id);
          return resultado;
        },
        updateMaestro:function(teacher){
          var resultado = $http.put(CONFIG.APIURL + "teachers/"+teacher.id,teacher);
          return resultado;
        }
      }

    });
})();
