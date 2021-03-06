(function() {
    'use strict';
    app.factory('GruposFactory', function(CONFIG,$http,Upload){
      return{
        getGrupos:function(){
          var resultado = $http.get(CONFIG.APIURL + "groups");
          return resultado;
        },
        findGrupos:function(query){
          var resultado = $http.post(CONFIG.APIURL + "groups/findGroupsQuery",query);
          return resultado;
        },
        getAllGrupos:function(){
          var resultado = $http.get(CONFIG.APIURL + "statistics/allGroups");
          return resultado;
        },
        getGruposActivos:function(){
          var resultado = $http.get(CONFIG.APIURL + "groups/findGroupsActive");
          return resultado;

        },
        updateGrupo:function(grupo){
          var resultado = $http.put(CONFIG.APIURL + "groups/" +grupo.id,grupo);
          return resultado;
        },
        createGrupo:function(grupo){
          var resultado = $http.post(CONFIG.APIURL + "groups/",grupo);
          return resultado;
        },
        addMaestro:function(grupo,maestro){
          var resultado = $http.post(CONFIG.APIURL + "groups/addTeacher",{group:grupo,teacher:maestro});
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
