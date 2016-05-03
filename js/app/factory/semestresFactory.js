(function() {
    'use strict';
    app.factory('SemestresFactory', function(CONFIG,$http){
      return{
        getSemestres:function(){
          var resultado = $http.get(CONFIG.APIURL + "semesters");
          return resultado;
        },
        updateSemestre:function(semestre){
          var resultado = $http.put(CONFIG.APIURL + "semesters/" +semestre.id,semestre);
          return resultado;
        },
        createSemestre:function(semestre){
          var resultado = $http.post(CONFIG.APIURL + "semesters",semestre);
          return resultado;
        },
        deleteSemestre:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "semesters/" + id);
          return resultado;
        }
      }

    });
})();
