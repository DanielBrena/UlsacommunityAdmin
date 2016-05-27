(function() {
    'use strict';
    app.factory('CarrerasFactory', function(CONFIG,$http){
      return{
        getCarreras:function(){
          var resultado = $http.get(CONFIG.APIURL + "careers");
          return resultado;
        },
        createCarrera:function(carrera){
          var resultado = $http.post(CONFIG.APIURL + "careers",carrera);
          return resultado;
        },
        updateCarrera:function(carrera){
          var resultado = $http.put(CONFIG.APIURL + "careers/"+carrera.id,carrera);
          return resultado;
        },
        deleteCarrera:function(id){
          var resultado = $http.delete(CONFIG.APIURL + "careers/"+id);
          return resultado
        }

      }
    })

})();
