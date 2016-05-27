(function() {
    'use strict';
    app.factory('GruposFactory', function(CONFIG,$http){
      return{
        getAllGrupos:function(){
          var resultado = $http.get(CONFIG.APIURL + "statistics/allGroups");
          return resultado;
        },
        updateGrupo:function(grupo){
          var resultado = $http.put(CONFIG.APIURL + "groups/" +grupo._id,grupo);
          return resultado;
        },
        createGrupo:function(grupo){
          var resultado = $http.post(CONFIG.APIURL + "groups/",grupo);
          return resultado;
        },
        uploadImagen:function(grupo){
          var resultado = Upload.upload({
             url: CONFIG.APIURL + "groups/uploadImage",
             data: grupo
           });
          return resultado
        },
        deleteGrupo:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "groups/"+id);
          return resultado;
        }
      }

    });
})();
