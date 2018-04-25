;
(function() {
  'use strict';
  var myApp = angular.module('myApp');
  myApp.service('authInterceptor', authInterceptor);
  authInterceptor.$inject = ['$rootScope', '$q', '$window', '$injector'];

  function authInterceptor($rootScope, $q, $window, $injector) {
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers['X-Auth-Token'] = $window.sessionStorage.token;
        }
        return config;
      },

      response: function(response) {
        if (response.status === 401) {
          // handle the case where the user is not authenticated
        }
        return response || $q.when(response);
      },

      responseError: function(error) {
        console.log(error);
        // handle the case where the user is not authenticated
        if (error.status === 403) {
          console.log(error.status);
        } else if (error.status === -1) {
          console.log(error.status);
        }
        return error || $q.when(error);
      },
    };
  }
})(window.angular);