(function() {
    'use strict';
    app.factory('EventosFactory', function(CONFIG,$http,Upload){
      return{
        getEventos:function(){
          var resultado = $http.get(CONFIG.APIURL + "events");
          return resultado;
        },

        setEvento:function(evento){
          var resultado = Upload.upload({
             url: CONFIG.APIURL + "events",
             data: evento
           });
          return resultado
        },
        deleteEvento:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "events/"+id);
          return resultado;
        }
      }

    });
})();
