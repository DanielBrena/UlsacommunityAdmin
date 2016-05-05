(function() {
    'use strict';
    app.factory('GruposFactory', function(CONFIG,$http){
      return{
        getAllGrupos:function(){
          var resultado = $http.get(CONFIG.APIURL + "statistics/allGroups");
          return resultado;
        }
      }

    });
})();
