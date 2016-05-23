(function() {
    'use strict';
    app.factory('EventosFactory', function(CONFIG,$http){
      return{
        getEventos:function(){
          var resultado = $http.get(CONFIG.APIURL + "events");
          return resultado;
        }
      }

    });
})();
