(function() {
    'use strict';
    app.factory('ActividadesFactory', function(CONFIG,$http){
      return{
        getActividades:function(){
          var resultado = $http.get(CONFIG.APIURL + "activities");
          return resultado;
        }
      }

    });
})();
