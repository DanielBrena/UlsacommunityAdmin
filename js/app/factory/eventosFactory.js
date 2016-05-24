(function() {
    'use strict';
    app.factory('EventosFactory', function(CONFIG,$http){
      return{
        getEventos:function(){
          var resultado = $http.get(CONFIG.APIURL + "events");
          return resultado;
        },

        setEvento:function(evento){
          var resultado = $http.post(CONFIG.APIURL + "events",evento,{
            headers : {
              'Content-Type' : undefined
            },
            transformRequest : angular.identity
          });
          return resultado;
        }
      }

    });
})();
