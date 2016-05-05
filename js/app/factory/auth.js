app.factory('Auth',  function($http, LocalFactory,AccessLevels,CONFIG) {
  return {
    authorize: function(access) {
      if (access === AccessLevels.user) {
        return this.isAuthenticated();
      } else {
        return true;
      }
    },
    isAuthenticated: function() {
      return LocalFactory.get('token_admin');
    },
    login: function(usuario) {
      var login = $http.post(CONFIG.APIURL + 'auth', usuario);
      login.success(function(data) {
        LocalFactory.set('token_admin', JSON.stringify(data));
      });
      return login;
    },
    logout:function(){
			LocalFactory.unset("token_admin");
      LocalFactory.clear();
      $state.go('login');
		}
  }
}).factory('AuthInterceptor', function($injector, $q) {
  var LocalFactory = $injector.get('LocalFactory');
  return {
    request: function(config) {
      var token;
      if (LocalFactory.get('token_admin')) {
        token = angular.fromJson(LocalFactory.get('token_admin')).token;
      }
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    responseError: function(response) {
      if (response.status === 401 || response.status === 403) {
        LocalFactory.unset('token_admin');
        $injector.get('$state').go('login');
      }
      return $q.reject(response);

    }
  }

}).config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});
