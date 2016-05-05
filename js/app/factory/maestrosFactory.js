(function() {
    'use strict';
    app.factory('MaestrosFactory', function(CONFIG,$http){
      return{
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
        }
      }

    });
})();
