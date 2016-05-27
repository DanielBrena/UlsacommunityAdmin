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
          // console.log(evento);
          // var resultado = $http.post(CONFIG.APIURL + "events",evento,{
          //   transformRequest : angular.identity,
          //   withCredentials : false,
          //   headers : {
          //     'Content-Type' : undefined
          //   },
          //
          // });
          // return resultado;
        }
      }

    });
})();
