(function () {
  'use strict';
  var myApp = angular.module('myApp', ['ngRoute', 'ngMessages', 'ngCookies', 'ngAnimate', 'ngSanitize', 'ui.bootstrap','angularUtils.directives.dirPagination','base64']);
  myApp.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

        $routeProvider
            .when('/login', {
              templateUrl: './login.html',
              controller: ''
            })
            .when("/dashboard", {
              templateUrl: './dashboard.html',
              controller: ''
            })


            .otherwise({
              redirectTo: '/login'
            });


        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        $httpProvider.interceptors.push('authInterceptor');

      }]
  );
})();