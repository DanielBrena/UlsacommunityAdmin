(function() {
    'use strict';
    app.factory('MaestrosFactory', function(CONFIG,$http){
      return{
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
