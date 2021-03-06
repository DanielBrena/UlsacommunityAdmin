(function() {
    'use strict';
    app.factory('AlumnosFactory', function(CONFIG,$http){
      return{
        getAllAlumnos:function(){
          var resultado = $http.get(CONFIG.APIURL + "statistics/allStudents");
          return resultado;
        },
        getAlumnos:function(id){
          var resultado = $http.get(CONFIG.APIURL + "groups/"+id);
          return resultado;
        },
        sendAsistencias:function(asistencias){
          var resultado = $http.post(CONFIG.APIURL + "assistances/createAll",asistencias);
          return resultado;
        },
        sendAsistencia:function(asistencia){
          var resultado = $http.post(CONFIG.APIURL + "assistances/create",asistencia);
          return resultado;
        },
        deleteAsistencias:function(asistencias){
          var resultado = $http.post(CONFIG.APIURL + "assistances/deleteAll",asistencias);
          return resultado;
        },
        getAsistencias:function(idStudent,idGroup){
          var resultado = $http.get(CONFIG.APIURL + "students/"+idStudent +"/assistancesByGroup/" + idGroup);
          return resultado;
        },
        updataAsistencia:function(asistencia){
          var resultado = $http.put(CONFIG.APIURL + "assistances/" + asistencia.id,asistencia);
          return resultado;
        },
        getCalificacion:function(asistencias){
          var resultado = $http.get(CONFIG.APIURL + "tablequalification/getQualification/"+asistencias);
          return resultado;
        },
        findAlumno:function(query){
          var resultado = $http.post(CONFIG.APIURL + "students/findByQuery",{search:query});
          return resultado;
        },
        findAlumnoGrupo:function(grupo,search){
          var resultado = $http.post(CONFIG.APIURL + "students/findByGroup",{search:search,group:grupo});
          return resultado;
        },
        createAlumno:function(alumno){
          var resultado = $http.post(CONFIG.APIURL + "students",alumno);
          return resultado;
        },
        createUserAlumno:function(user){
          var resultado = $http.post(CONFIG.APIURL + "users/createStudent",user);
          return resultado;
        },
        updateAlumno:function(alumno){
          var resultado = $http.put(CONFIG.APIURL + "students/"+alumno.id,alumno);
          return resultado;
        },
        updateUserAlumno:function(user){
          var resultado = $http.put(CONFIG.APIURL + "users/"+user.id,user);
          return resultado;
        },
        deleteAlumno:function(alumno){
          var resultado = $http.delete(CONFIG.APIURL + "students/"+alumno.id,alumno);
          return resultado;
        },
        removeAlumno:function(alumno){
          var resultado = $http.post(CONFIG.APIURL + "groups/removeStudent",alumno);
          return resultado;
        },

        addAlumnos:function(estudiantes){
          var resultado = $http.post(CONFIG.APIURL + "groups/addStudents",estudiantes);
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
