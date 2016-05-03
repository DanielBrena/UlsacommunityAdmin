(function() {
    'use strict';
    app.factory('ViernesFactory', function(CONFIG,$http){
      return{
        createAsistencia:function(alumno,grupo){
          var asistencia = {};
          asistencia.alumno = alumno;
          asistencia.grupo = grupo;
          asistencia.asistenciabool = true;
          asistencia.asistenciastring = "viernes cultural";
          var resultado = $http.post(CONFIG.APIURL + "assistances/create",asistencia);
          return resultado;
        },
        getAsistencias:function(){
          var resultado = $http.get(CONFIG.APIURL + "assistances/types/viernes cultural");
          return resultado;
        },
        getReporte:function(fecha){
          var resultado = CONFIG.APIURL + "assistances/reporte/"+fecha;
          return resultado;
        }
      }

    });
})();
