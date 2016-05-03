(function() {
    'use strict';
    app.factory('AlumnosFactory', function(CONFIG,$http){
      return{
        getAlumnos:function(id){
          var resultado = $http.get(CONFIG.APIURL + "groups/"+id);
          return resultado;
        },
        findAlumno:function(query){
          var resultado = $http.post(CONFIG.APIURL + "students/findByQuery",{search:query});
          return resultado;
        },
        createSemestre:function(teacher){
          var resultado = $http.post(CONFIG.APIURL + "teachers",teacher);
          return resultado;
        },
        deleteSemestre:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "teachers/" + id);
          return resultado;
        }
      }

    });
})();
