(function() {
  'use strict';
  app.factory('ActividadesFactory', function(CONFIG,$http){
    return{
      getActividades:function(){
        var resultado = $http.get(CONFIG.APIURL + "activities");
        return resultado;
      },
      createActividad:function(actividad){
        var resultado = $http.post(CONFIG.APIURL + "activities",actividad);
        return resultado;
      },
      updateActividad:function(actividad){
        var resultado = $http.put(CONFIG.APIURL + "activities/"+actividad.id,actividad);
        return resultado;
      },
      deleteActividad:function(id){
        var resultado = $http.delete(CONFIG.APIURL + "activities/"+id);
        return resultado
      }
    }

  });
})();
